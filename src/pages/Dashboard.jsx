import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bug,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Clock3,
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { issues } = useIssues();
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Any status");
  const [priorityFilter, setPriorityFilter] = useState("Any priority");
  const [openDropdown, setOpenDropdown] = useState(null);

  const typeOptions = ["All", "Bug", "Story", "Task", "Sub-task"];
  const statusOptions = ["Any status", "Open", "In Progress", "QA", "Done"];
  const priorityOptions = ["Any priority", "Low", "Medium", "High", "Critical"];

  const openCount = issues.filter((i) => i.status === "Open").length;
  const inProgressCount = issues.filter((i) => i.status === "In Progress").length;
  const bugCount = issues.filter((i) => i.type === "Bug").length;
  const doneCount = issues.filter((i) => i.status === "Done").length;

  const totalSprintIssues = issues.length;
  const sprintProgressPercent = totalSprintIssues
    ? Math.round((doneCount / totalSprintIssues) * 100)
    : 68;

  const statistics = [
    {
      title: "Open",
      value: String(openCount).padStart(2, "0"),
      icon: Clock3,
      detail: "+3 today",
    },
    {
      title: "In progress",
      value: String(inProgressCount).padStart(2, "0"),
      icon: Sparkles,
      detail: `${inProgressCount} active`,
    },
    {
      title: "Bugs",
      value: String(bugCount).padStart(2, "0"),
      icon: Bug,
      detail: `${issues.filter((i) => i.type === "Bug" && i.priority === "Critical").length || 2} critical`,
    },
    {
      title: "Done",
      value: String(doneCount).padStart(2, "0"),
      icon: CheckCircle2,
      detail: "This sprint",
    },
  ];

  const hasActiveFilters =
    typeFilter !== "All" ||
    statusFilter !== "Any status" ||
    priorityFilter !== "Any priority" ||
    search.trim() !== "";

  const resetFilters = () => {
    setTypeFilter("All");
    setStatusFilter("Any status");
    setPriorityFilter("Any priority");
    setSearch("");
    setOpenDropdown(null);
  };

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesType = typeFilter === "All" || issue.type === typeFilter;
      const matchesStatus =
        statusFilter === "Any status" || issue.status === statusFilter;
      const matchesPriority =
        priorityFilter === "Any priority" || issue.priority === priorityFilter;

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

      return matchesType && matchesStatus && matchesPriority && matchesSearch;
    });
  }, [issues, typeFilter, statusFilter, priorityFilter, search]);

  const recentIssues = filteredIssues.slice(0, 5);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good morning";
    }

    if (hour >= 12 && hour < 17) {
      return "Good afternoon";
    }

    if (hour >= 17 && hour < 21) {
      return "Good evening";
    }

    return "Good night";
  };

  const greeting = getGreeting();

  const getIssueIcon = (type) => {
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

  return (
    <MobileShell className="pb-28">
      {/* HEADER */}

      <header className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#171512] text-[20px] text-[#D1B58B]">
            ⬢
          </div>

          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.19em] text-[#8C8173]">
              Quantum Flow
            </p>

            <h1 className="mt-[1px] text-[14px] font-semibold tracking-[-0.02em] text-[#171512]">
              {greeting}, Rohith
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#171512]/[0.06] bg-[#F3EEE6] transition hover:border-[#171512]/15 active:scale-95"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171512] text-[9px] font-semibold text-[#FFFCF7]">
            RN
          </div>
        </button>
      </header>

      <div className="px-5 pt-6">
        {/* SPRINT */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[27px] bg-[#171512] p-5 text-[#FFFCF7]"
        >
          {/* subtle luxury glow */}

          <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#B89B72]/10 blur-3xl" />

          <div className="relative flex items-start justify-between">
            <div
              className="cursor-pointer"
              onClick={() => navigate("/board")}
            >
              <p className="text-[10px] text-[#D1B58B]">Current sprint</p>

              <h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em]">
                Platform Revamp
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate("/board")}
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/[0.07] text-[#D1B58B] transition hover:bg-[#B89B72] hover:text-[#171512] active:scale-95"
            >
              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="relative mt-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] text-white/40">Sprint progress</span>

              <span className="text-[10px] font-semibold text-[#D1B58B]">
                {sprintProgressPercent}%
              </span>
            </div>

            <div className="h-[6px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sprintProgressPercent}%` }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                }}
                className="h-full rounded-full bg-[#D1B58B]"
              />
            </div>
          </div>

          <div className="relative mt-5 flex items-center justify-between">
            <div className="flex -space-x-2">
              {["RN", "AK", "SK", "VM"].map((member) => (
                <div
                  key={member}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#171512] bg-[#F5F0E8] text-[8px] font-semibold text-[#171512]"
                >
                  {member}
                </div>
              ))}
            </div>

            <span className="text-[9px] text-white/35">8 days remaining</span>
          </div>
        </motion.section>

        {/* SEARCH */}

        <div className="mt-5 flex items-center gap-2.5">
          <div className="flex h-[48px] flex-1 items-center gap-2.5 rounded-[17px] border border-[#171512]/[0.04] bg-[#F3EEE6] px-4">
            <Search size={16} strokeWidth={1.8} className="text-[#8C8173]" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search issues, tasks..."
              className="min-w-0 flex-1 bg-transparent text-[11px] text-[#171512] outline-none placeholder:text-[#8C8173]/60"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[16px] transition active:scale-95 ${
              showFilters || hasActiveFilters
                ? "bg-[#B89B72] text-[#171512]"
                : "bg-[#171512] text-[#D1B58B]"
            }`}
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>

        {/* DASHBOARD FILTERS PANEL */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 overflow-hidden rounded-[20px] border border-[#171512]/[0.05] bg-[#F7F2EB] p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-semibold text-[#171512]">
                  Filter workspace
                </p>
                <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                  Refine displayed statistics and issues
                </p>
              </div>

              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[8px] font-semibold text-[#B89B72] hover:underline"
                  >
                    Reset
                  </button>
                )}
                <SlidersHorizontal size={14} className="text-[#B89B72]" />
              </div>
            </div>

            {/* TYPE PILLS */}
            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {typeOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[8px] font-medium transition ${
                    typeFilter === t
                      ? "bg-[#171512] text-[#FFFCF7]"
                      : "bg-[#FFFCF7] text-[#8C8173]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {/* STATUS BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((curr) =>
                    curr === "status" ? null : "status",
                  )
                }
                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-2.5 transition ${
                  statusFilter !== "Any status" || openDropdown === "status"
                    ? "border border-[#B89B72]/40 bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#FFFCF7] text-[#171512]"
                }`}
              >
                <div className="text-left">
                  <p
                    className={`text-[7px] ${
                      statusFilter !== "Any status" || openDropdown === "status"
                        ? "text-[#D1B58B]"
                        : "text-[#9B8E7E]"
                    }`}
                  >
                    Status
                  </p>
                  <p className="truncate text-[8px] font-medium">
                    {statusFilter}
                  </p>
                </div>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    openDropdown === "status" ? "rotate-180 text-[#D1B58B]" : ""
                  }`}
                />
              </button>

              {/* PRIORITY BUTTON */}
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown((curr) =>
                    curr === "priority" ? null : "priority",
                  )
                }
                className={`flex w-full items-center justify-between rounded-[14px] px-3 py-2.5 transition ${
                  priorityFilter !== "Any priority" || openDropdown === "priority"
                    ? "border border-[#B89B72]/40 bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#FFFCF7] text-[#171512]"
                }`}
              >
                <div className="text-left">
                  <p
                    className={`text-[7px] ${
                      priorityFilter !== "Any priority" ||
                      openDropdown === "priority"
                        ? "text-[#D1B58B]"
                        : "text-[#9B8E7E]"
                    }`}
                  >
                    Priority
                  </p>
                  <p className="truncate text-[8px] font-medium">
                    {priorityFilter}
                  </p>
                </div>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    openDropdown === "priority"
                      ? "rotate-180 text-[#D1B58B]"
                      : ""
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
            </div>
          </motion.div>
        )}

        {/* OVERVIEW */}

        <div className="mt-7 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-[#9B8E7E]">Overview</p>

            <h2 className="mt-0.5 text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Your workspace
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/work")}
            className="text-[10px] font-medium text-[#8C8173] transition hover:text-[#171512]"
          >
            View all
          </button>
        </div>

        {/* STATS */}

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {statistics.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/work")}
                className="rounded-[22px] border border-[#171512]/[0.04] bg-[#F4EFE7] p-4 text-left transition hover:bg-[#EFE9E0]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#FFFCF7] text-[#574A3A] shadow-[0_3px_12px_rgba(43,36,28,0.04)]">
                    <Icon size={16} strokeWidth={1.8} />
                  </div>

                  <span className="text-[8px] text-[#9B8E7E]">
                    {item.detail}
                  </span>
                </div>

                <p className="mt-6 text-[28px] font-semibold leading-none tracking-[-0.05em] text-[#171512]">
                  {item.value}
                </p>

                <p className="mt-1.5 text-[10px] text-[#8C8173]">
                  {item.title}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* ISSUES */}

        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] text-[#9B8E7E]">Assigned to you</p>

            <h2 className="mt-0.5 text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Recent issues
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/work")}
            className="flex items-center gap-1 text-[10px] font-medium text-[#8C8173] transition hover:text-[#171512]"
          >
            See all
            <ChevronRight size={13} />
          </button>
        </div>

        <div className="mt-3 overflow-hidden rounded-[23px] border border-[#171512]/[0.06] bg-[#FFFCF7]">
          {recentIssues.length > 0 ? (
            recentIssues.map((issue, index) => {
              const Icon = getIssueIcon(issue.type);

              return (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => navigate(`/issue/${issue.id}`)}
                  className={`flex w-full items-center gap-3 p-4 text-left transition hover:bg-[#F6F1EA] active:bg-[#ECE6DC] ${
                    index !== recentIssues.length - 1
                      ? "border-b border-[#171512]/[0.06]"
                      : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#F3EEE6] text-[#574A3A]">
                    <Icon size={17} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-medium text-[#9B8E7E]">
                      {issue.id}
                    </p>

                    <h3 className="mt-[2px] truncate text-[12px] font-semibold text-[#171512]">
                      {issue.title}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="rounded-full bg-[#EEE5D9] px-2 py-[3px] text-[8px] font-medium text-[#665746]">
                        {issue.type}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-[#B89B72]" />

                      <span className="text-[8px] text-[#8C8173]">
                        {issue.priority}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171512] text-[8px] font-semibold text-white">
                    {issue.assignee || issue.initials || "RN"}
                  </div>

                  <ChevronRight size={14} className="shrink-0 text-[#8C8173]" />
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#F3EEE6] text-[#8C8173]">
                <Search size={18} />
              </div>
              <p className="mt-3 text-[11px] font-semibold text-[#171512]">
                No matching issues
              </p>
              <p className="mt-1 text-[8px] text-[#9B8E7E]">
                Try adjusting your search or filters.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="mt-3 rounded-full bg-[#171512] px-3.5 py-1.5 text-[8px] font-semibold text-[#D1B58B]"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomDock onCreate={() => setShowCreate(true)} />

      {/* CREATE SHEET */}

      {showCreate && (
        <div
          onClick={() => setShowCreate(false)}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#171512]/45 px-3 pb-3 backdrop-blur-[4px]"
        >
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[390px] rounded-[30px] bg-[#FFFCF7] p-5"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-[#171512]/10" />

            <div className="mt-5">
              <p className="text-[10px] text-[#9B8E7E]">Quantum Flow</p>

              <h2 className="mt-1 text-[24px] font-semibold tracking-[-0.04em] text-[#171512]">
                Create new issue
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {["Bug", "Story", "Task", "Sub-task"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setShowCreate(false);
                    navigate("/create");
                  }}
                  className="rounded-[18px] bg-[#F3EEE6] px-4 py-4 text-left text-[12px] font-semibold text-[#171512] transition hover:bg-[#171512] hover:text-[#FFFCF7]"
                >
                  {type}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCreate(false)}
              className="mt-4 h-[52px] w-full rounded-[18px] bg-[#171512] text-[11px] font-semibold text-[#FFFCF7]"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </MobileShell>
  );
};

export default Dashboard;
