import { motion } from "framer-motion";
import {
  Bug,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Columns3,
  FileText,
  ListTodo,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";
import { useIssues } from "../context/IssueContext";

const Work = () => {
  const navigate = useNavigate();
  const { issues } = useIssues();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Any status");
  const [priorityFilter, setPriorityFilter] = useState("Any priority");
  const [assigneeFilter, setAssigneeFilter] = useState("Anyone");
  const [sprintFilter, setSprintFilter] = useState("Current");
  const [openDropdown, setOpenDropdown] = useState(null);

  const filters = ["All", "Bug", "Story", "Task", "Sub-task"];
  const statusOptions = ["Any status", "Open", "In Progress", "QA", "Done"];
  const priorityOptions = ["Any priority", "Low", "Medium", "High", "Critical"];
  const assigneeOptions = [
    "Anyone",
    "Rohith Naidu",
    "Arjun K",
    "Sanjay K",
    "Vikram M",
  ];
  const sprintOptions = ["Current", "All sprints"];

  const getTypeIcon = (type) => {
    switch (type) {
      case "Bug":
        return Bug;

      case "Story":
        return FileText;

      case "Task":
        return CheckCircle2;

      case "Sub-task":
        return ListTodo;

      default:
        return CircleDot;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Progress":
        return Sparkles;

      case "QA":
        return CircleDot;

      case "Done":
        return CheckCircle2;

      default:
        return CircleDot;
    }
  };

  const hasActiveFilters =
    statusFilter !== "Any status" ||
    priorityFilter !== "Any priority" ||
    assigneeFilter !== "Anyone" ||
    sprintFilter !== "Current" ||
    activeFilter !== "All" ||
    search.trim() !== "";

  const resetAllFilters = () => {
    setActiveFilter("All");
    setStatusFilter("Any status");
    setPriorityFilter("Any priority");
    setAssigneeFilter("Anyone");
    setSprintFilter("Current");
    setSearch("");
    setOpenDropdown(null);
  };

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesType = activeFilter === "All" || issue.type === activeFilter;

      const matchesStatus =
        statusFilter === "Any status" || issue.status === statusFilter;

      const matchesPriority =
        priorityFilter === "Any priority" || issue.priority === priorityFilter;

      const matchesAssignee =
        assigneeFilter === "Anyone" ||
        issue.assigneeName === assigneeFilter ||
        (assigneeFilter === "Rohith Naidu" && issue.assignee === "RN") ||
        (assigneeFilter === "Arjun K" && issue.assignee === "AK") ||
        (assigneeFilter === "Sanjay K" && issue.assignee === "SK") ||
        (assigneeFilter === "Vikram M" && issue.assignee === "VM");

      const matchesSprint =
        sprintFilter === "All sprints" || sprintFilter === "Current";

      const value = search.trim().toLowerCase();

      const matchesSearch =
        !value ||
        issue.title.toLowerCase().includes(value) ||
        issue.id.toLowerCase().includes(value) ||
        issue.type.toLowerCase().includes(value) ||
        issue.status.toLowerCase().includes(value) ||
        issue.priority.toLowerCase().includes(value) ||
        (issue.assigneeName &&
          issue.assigneeName.toLowerCase().includes(value));

      return (
        matchesType &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee &&
        matchesSprint &&
        matchesSearch
      );
    });
  }, [
    issues,
    activeFilter,
    statusFilter,
    priorityFilter,
    assigneeFilter,
    sprintFilter,
    search,
  ]);

  return (
    <MobileShell className="pb-28">
      {/* ================= HEADER ================= */}

      <header className="px-5 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.19em] text-[#9B8E7E]">
              Quantum Flow
            </p>

            <h1 className="mt-1 text-[26px] font-semibold tracking-[-0.045em] text-[#171512]">
              Your work
            </h1>

            <p className="mt-1 text-[10px] text-[#8C8173]">
              Track and manage everything in one place.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#171512] text-[19px] text-[#D1B58B]">
            ⬢
          </div>
        </div>

        {/* ================= SUMMARY ================= */}

        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-[18px] border border-[#171512]/[0.04] bg-[#F3EEE6] p-3">
            <p className="text-[8px] text-[#9B8E7E]">Assigned</p>

            <p className="mt-1 text-[20px] font-semibold tracking-[-0.04em] text-[#171512]">
              12
            </p>
          </div>

          <div className="rounded-[18px] border border-[#171512]/[0.04] bg-[#F3EEE6] p-3">
            <p className="text-[8px] text-[#9B8E7E]">In progress</p>

            <p className="mt-1 text-[20px] font-semibold tracking-[-0.04em] text-[#171512]">
              07
            </p>
          </div>

          <div className="rounded-[18px] bg-[#171512] p-3 text-white">
            <p className="text-[8px] text-[#D1B58B]">Critical</p>

            <p className="mt-1 text-[20px] font-semibold tracking-[-0.04em]">
              02
            </p>
          </div>
        </div>
      </header>

      <div className="px-5">
        {/* ================= SPRINT BOARD ================= */}

        <motion.button
          whileTap={{ scale: 0.985 }}
          onClick={() => navigate("/board")}
          className="mt-3 flex h-[52px] w-full items-center justify-between rounded-[17px] bg-[#171512] px-4 text-white"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-white/[0.07]">
              <Columns3
                size={15}
                strokeWidth={1.8}
                className="text-[#D1B58B]"
              />
            </div>

            <div className="text-left">
              <p className="text-[9px] font-semibold">Open sprint board</p>

              <p className="mt-[1px] text-[7px] text-white/35">
                Open → In Progress → QA → Done
              </p>
            </div>
          </div>

          <ChevronRight size={15} className="text-[#D1B58B]" />
        </motion.button>

        {/* ================= SEARCH ================= */}

        <div className="mt-5 flex gap-2">
          <div className="flex h-[47px] flex-1 items-center gap-2.5 rounded-[17px] border border-[#171512]/[0.04] bg-[#F3EEE6] px-4">
            <Search size={16} strokeWidth={1.8} className="text-[#8C8173]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search work..."
              className="min-w-0 flex-1 bg-transparent text-[11px] text-[#171512] outline-none placeholder:text-[#9B8E7E]"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowFilters((value) => !value)}
            className={`flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-[16px] transition ${
              showFilters
                ? "bg-[#B89B72] text-[#171512]"
                : "bg-[#171512] text-[#D1B58B]"
            }`}
          >
            <SlidersHorizontal size={17} />
          </motion.button>
        </div>

        {/* ================= TYPE FILTERS ================= */}

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-4 py-2 text-[9px] font-medium transition ${
                  active
                    ? "bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#F3EEE6] text-[#8C8173]"
                }`}
              >
                {filter}
              </motion.button>
            );
          })}
        </div>

        {/* ================= ADVANCED FILTER ================= */}

        {showFilters && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-3 overflow-hidden rounded-[20px] border border-[#171512]/[0.05] bg-[#F7F2EB] p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-semibold text-[#171512]">
                  Filter issues
                </p>

                <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                  Narrow down your workspace
                </p>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[8px] font-semibold text-[#B89B72] hover:underline"
                  >
                    Reset
                  </button>
                )}
                <SlidersHorizontal size={14} className="text-[#B89B72]" />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {/* STATUS */}
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((curr) =>
                    curr === "status" ? null : "status",
                  )
                }
                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-3 transition ${
                  statusFilter !== "Any status" || openDropdown === "status"
                    ? "border border-[#B89B72]/40 bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#FFFCF7] text-[#171512]"
                }`}
              >
                <div className="text-left">
                  <p
                    className={`text-[8px] ${
                      statusFilter !== "Any status" || openDropdown === "status"
                        ? "text-[#D1B58B]"
                        : "text-[#9B8E7E]"
                    }`}
                  >
                    Status
                  </p>

                  <p className="mt-[2px] truncate text-[9px] font-medium">
                    {statusFilter}
                  </p>
                </div>

                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    openDropdown === "status" ? "rotate-180 text-[#D1B58B]" : ""
                  } ${
                    statusFilter !== "Any status"
                      ? "text-[#D1B58B]"
                      : "text-[#8C8173]"
                  }`}
                />
              </button>

              {/* PRIORITY */}
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((curr) =>
                    curr === "priority" ? null : "priority",
                  )
                }
                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-3 transition ${
                  priorityFilter !== "Any priority" || openDropdown === "priority"
                    ? "border border-[#B89B72]/40 bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#FFFCF7] text-[#171512]"
                }`}
              >
                <div className="text-left">
                  <p
                    className={`text-[8px] ${
                      priorityFilter !== "Any priority" ||
                      openDropdown === "priority"
                        ? "text-[#D1B58B]"
                        : "text-[#9B8E7E]"
                    }`}
                  >
                    Priority
                  </p>

                  <p className="mt-[2px] truncate text-[9px] font-medium">
                    {priorityFilter}
                  </p>
                </div>

                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    openDropdown === "priority"
                      ? "rotate-180 text-[#D1B58B]"
                      : ""
                  } ${
                    priorityFilter !== "Any priority"
                      ? "text-[#D1B58B]"
                      : "text-[#8C8173]"
                  }`}
                />
              </button>

              {/* INLINE STATUS OPTIONS */}
              {openDropdown === "status" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-2 grid grid-cols-2 gap-1.5 rounded-[16px] border border-[#171512]/[0.06] bg-[#FFFCF7] p-2"
                >
                  {statusOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setStatusFilter(opt);
                        setOpenDropdown(null);
                      }}
                      className={`rounded-[11px] px-3 py-2 text-left text-[8px] font-medium transition ${
                        statusFilter === opt
                          ? "bg-[#171512] text-[#D1B58B]"
                          : "bg-[#F3EEE6] text-[#665746] hover:bg-[#ECE5D9]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* INLINE PRIORITY OPTIONS */}
              {openDropdown === "priority" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-2 grid grid-cols-2 gap-1.5 rounded-[16px] border border-[#171512]/[0.06] bg-[#FFFCF7] p-2"
                >
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setPriorityFilter(opt);
                        setOpenDropdown(null);
                      }}
                      className={`rounded-[11px] px-3 py-2 text-left text-[8px] font-medium transition ${
                        priorityFilter === opt
                          ? "bg-[#171512] text-[#D1B58B]"
                          : "bg-[#F3EEE6] text-[#665746] hover:bg-[#ECE5D9]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* ASSIGNEE */}
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((curr) =>
                    curr === "assignee" ? null : "assignee",
                  )
                }
                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-3 transition ${
                  assigneeFilter !== "Anyone" || openDropdown === "assignee"
                    ? "border border-[#B89B72]/40 bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#FFFCF7] text-[#171512]"
                }`}
              >
                <div className="text-left">
                  <p
                    className={`text-[8px] ${
                      assigneeFilter !== "Anyone" || openDropdown === "assignee"
                        ? "text-[#D1B58B]"
                        : "text-[#9B8E7E]"
                    }`}
                  >
                    Assignee
                  </p>

                  <p className="mt-[2px] truncate text-[9px] font-medium">
                    {assigneeFilter}
                  </p>
                </div>

                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    openDropdown === "assignee"
                      ? "rotate-180 text-[#D1B58B]"
                      : ""
                  } ${
                    assigneeFilter !== "Anyone"
                      ? "text-[#D1B58B]"
                      : "text-[#8C8173]"
                  }`}
                />
              </button>

              {/* SPRINT */}
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((curr) =>
                    curr === "sprint" ? null : "sprint",
                  )
                }
                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-3 transition ${
                  sprintFilter !== "Current" || openDropdown === "sprint"
                    ? "border border-[#B89B72]/40 bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#FFFCF7] text-[#171512]"
                }`}
              >
                <div className="text-left">
                  <p
                    className={`text-[8px] ${
                      sprintFilter !== "Current" || openDropdown === "sprint"
                        ? "text-[#D1B58B]"
                        : "text-[#9B8E7E]"
                    }`}
                  >
                    Sprint
                  </p>

                  <p className="mt-[2px] truncate text-[9px] font-medium">
                    {sprintFilter}
                  </p>
                </div>

                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    openDropdown === "sprint" ? "rotate-180 text-[#D1B58B]" : ""
                  } ${
                    sprintFilter !== "Current"
                      ? "text-[#D1B58B]"
                      : "text-[#8C8173]"
                  }`}
                />
              </button>

              {/* INLINE ASSIGNEE OPTIONS */}
              {openDropdown === "assignee" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-2 grid grid-cols-2 gap-1.5 rounded-[16px] border border-[#171512]/[0.06] bg-[#FFFCF7] p-2"
                >
                  {assigneeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setAssigneeFilter(opt);
                        setOpenDropdown(null);
                      }}
                      className={`rounded-[11px] px-3 py-2 text-left text-[8px] font-medium transition ${
                        assigneeFilter === opt
                          ? "bg-[#171512] text-[#D1B58B]"
                          : "bg-[#F3EEE6] text-[#665746] hover:bg-[#ECE5D9]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* INLINE SPRINT OPTIONS */}
              {openDropdown === "sprint" && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-2 grid grid-cols-2 gap-1.5 rounded-[16px] border border-[#171512]/[0.06] bg-[#FFFCF7] p-2"
                >
                  {sprintOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSprintFilter(opt);
                        setOpenDropdown(null);
                      }}
                      className={`rounded-[11px] px-3 py-2 text-left text-[8px] font-medium transition ${
                        sprintFilter === opt
                          ? "bg-[#171512] text-[#D1B58B]"
                          : "bg-[#F3EEE6] text-[#665746] hover:bg-[#ECE5D9]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ================= ISSUE TITLE ================= */}

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[9px] text-[#9B8E7E]">Issues</p>

            <h2 className="mt-[1px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              {activeFilter === "All"
                ? "All work"
                : activeFilter === "Story"
                  ? "Stories"
                  : `${activeFilter}s`}
            </h2>
          </div>

          <span className="rounded-full bg-[#F3EEE6] px-2.5 py-1 text-[8px] font-medium text-[#8C8173]">
            {filteredIssues.length}{" "}
            {filteredIssues.length === 1 ? "issue" : "issues"}
          </span>
        </div>

        {/* ================= ISSUE LIST ================= */}

        <div className="mt-3 space-y-2.5">
          {filteredIssues.map((issue, index) => {
            const TypeIcon = getTypeIcon(issue.type);
            const StatusIcon = getStatusIcon(issue.status);

            return (
              <motion.button
                key={issue.id}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.04,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                onClick={() => navigate(`/issue/${issue.id}`)}
                className="w-full rounded-[22px] border border-[#171512]/[0.055] bg-[#FFFCF7] p-4 text-left transition duration-300 hover:bg-[#F8F4ED]"
              >
                <div className="flex items-start gap-3">
                  {/* TYPE ICON */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#F3EEE6] text-[#574A3A]">
                    <TypeIcon size={17} strokeWidth={1.8} />
                  </div>

                  {/* ISSUE INFO */}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-semibold text-[#9B8E7E]">
                        {issue.id}
                      </span>

                      <span className="rounded-full bg-[#EEE5D9] px-2 py-[3px] text-[7px] font-medium text-[#665746]">
                        {issue.type}
                      </span>
                    </div>

                    <h3 className="mt-1.5 text-[12px] font-semibold leading-[17px] text-[#171512]">
                      {issue.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-[9px] leading-[14px] text-[#8C8173]">
                      {issue.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={15}
                    className="mt-1 shrink-0 text-[#9B8E7E]"
                  />
                </div>

                {/* ISSUE FOOTER */}

                <div className="mt-4 flex items-center justify-between border-t border-[#171512]/[0.045] pt-3">
                  <div className="flex min-w-0 items-center gap-2">
                    {/* STATUS */}

                    <div className="flex items-center gap-1.5 rounded-full bg-[#F3EEE6] px-2.5 py-1.5">
                      <StatusIcon size={10} strokeWidth={2} />

                      <span className="whitespace-nowrap text-[8px] font-medium text-[#665746]">
                        {issue.status}
                      </span>
                    </div>

                    {/* PRIORITY */}

                    <div className="flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-[#B89B72]" />

                      <span className="whitespace-nowrap text-[8px] text-[#8C8173]">
                        {issue.priority}
                      </span>
                    </div>
                  </div>

                  {/* ASSIGNEE */}

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#171512] text-[7px] font-semibold text-white">
                    {issue.assignee}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ================= EMPTY STATE ================= */}

        {filteredIssues.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-12 pb-8 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#F3EEE6]">
              <Search size={19} className="text-[#8C8173]" />
            </div>

            <h3 className="mt-4 text-[13px] font-semibold text-[#171512]">
              No issues found
            </h3>

            <p className="mt-1 text-[9px] text-[#8C8173]">
              Try another search or filter.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-4 rounded-full bg-[#171512] px-4 py-2 text-[8px] font-semibold text-[#D1B58B]"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>

      {/* ================= BOTTOM NAVIGATION ================= */}

      <BottomDock />
    </MobileShell>
  );
};

export default Work;
