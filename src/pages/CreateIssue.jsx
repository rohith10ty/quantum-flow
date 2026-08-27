import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bug,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  FileText,
  ListTodo,
  Plus,
  Tag,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";
import { useIssues } from "../context/IssueContext";

const CreateIssue = () => {
  const navigate = useNavigate();
  const { createIssue } = useIssues();

  const [issueType, setIssueType] = useState("Task");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("Rohith Naidu");
  const [status, setStatus] = useState("Open");

  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [storyPoints, setStoryPoints] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [labels, setLabels] = useState([]);
  const [labelInput, setLabelInput] = useState("");

  const issueTypes = [
    {
      name: "Bug",
      icon: Bug,
    },
    {
      name: "Story",
      icon: FileText,
    },
    {
      name: "Task",
      icon: CheckCircle2,
    },
    {
      name: "Sub-task",
      icon: ListTodo,
    },
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];
  const statuses = ["Open", "In Progress", "QA", "Done"];

  const team = [
    {
      name: "Rohith Naidu",
      initials: "RN",
      role: "Frontend",
    },
    {
      name: "Arjun K",
      initials: "AK",
      role: "Backend",
    },
    {
      name: "Sanjay K",
      initials: "SK",
      role: "QA",
    },
    {
      name: "Vikram M",
      initials: "VM",
      role: "DevOps",
    },
  ];

  const addLabel = () => {
    const value = labelInput.trim().toLowerCase();

    if (!value) return;

    if (!labels.includes(value)) {
      setLabels((current) => [...current, value]);
    }

    setLabelInput("");
  };

  const removeLabel = (label) => {
    setLabels((current) => current.filter((item) => item !== label));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedMember = team.find((member) => member.name === assignee);

    const newIssue = createIssue({
      title: summary.trim(),
      description: description.trim(),
      type: issueType,
      priority,
      assignee: selectedMember?.initials || "RN",
      assigneeName: assignee,
      status,
      labels,
      storyPoints: Number(storyPoints || 0),
      dueDate,
    });

    navigate(`/issue/${newIssue.id}`);
  };

  const TypeIcon =
    issueTypes.find((item) => item.name === issueType)?.icon || CheckCircle2;

  return (
    <MobileShell className="pb-28">
      <div className="min-h-[100dvh] bg-[#FFFCF7] pb-8">
        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-[#171512]/[0.05] bg-[#FFFCF7]/95 px-5 pb-4 pt-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#171512]/[0.08]"
            >
              <ArrowLeft size={17} />
            </button>

            <div className="text-center">
              <p className="text-[8px] uppercase tracking-[0.18em] text-[#9B8E7E]">
                Quantum Flow
              </p>

              <h1 className="mt-[2px] text-[13px] font-semibold text-[#171512]">
                Create issue
              </h1>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#171512] text-[#D1B58B]">
              ⬢
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="px-5 pt-5">
          {/* INTRO */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[9px] text-[#9B8E7E]">New work item</p>

            <h2 className="mt-1 text-[26px] font-semibold tracking-[-0.045em] text-[#171512]">
              What needs to be done?
            </h2>

            <p className="mt-2 text-[10px] leading-4 text-[#8C8173]">
              Create a bug, story, task or sub-task for your workspace.
            </p>
          </motion.div>

          {/* TYPE */}

          <section className="mt-7">
            <label className="text-[9px] font-medium text-[#665746]">
              Issue type
            </label>

            <div className="relative mt-2">
              <button
                type="button"
                onClick={() => setShowTypeMenu((value) => !value)}
                className="flex h-[54px] w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] px-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#FFFCF7]">
                    <TypeIcon size={16} className="text-[#665746]" />
                  </div>

                  <span className="text-[11px] font-semibold text-[#171512]">
                    {issueType}
                  </span>
                </div>

                <ChevronDown size={15} className="text-[#8C8173]" />
              </button>

              {showTypeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 grid grid-cols-2 gap-2"
                >
                  {issueTypes.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => {
                          setIssueType(item.name);
                          setShowTypeMenu(false);
                        }}
                        className={`flex items-center gap-2 rounded-[15px] px-3 py-3 text-left ${
                          issueType === item.name
                            ? "bg-[#171512] text-[#D1B58B]"
                            : "bg-[#F3EEE6] text-[#665746]"
                        }`}
                      >
                        <Icon size={14} />
                        <span className="text-[9px] font-medium">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </section>

          {/* SUMMARY */}

          <section className="mt-5">
            <label className="text-[9px] font-medium text-[#665746]">
              Summary
            </label>

            <input
              required
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Short issue summary"
              className="mt-2 h-[52px] w-full rounded-[18px] bg-[#F3EEE6] px-4 text-[11px] text-[#171512] outline-none placeholder:text-[#9B8E7E]"
            />
          </section>

          {/* DESCRIPTION */}

          <section className="mt-5">
            <label className="text-[9px] font-medium text-[#665746]">
              Description
            </label>

            <textarea
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the issue..."
              rows={5}
              className="mt-2 w-full resize-none rounded-[18px] bg-[#F3EEE6] px-4 py-4 text-[10px] leading-4 text-[#171512] outline-none placeholder:text-[#9B8E7E]"
            />
          </section>

          {/* PRIORITY */}

          <section className="mt-5">
            <label className="text-[9px] font-medium text-[#665746]">
              Priority
            </label>

            <button
              type="button"
              onClick={() => setShowPriorityMenu((value) => !value)}
              className="mt-2 flex h-[52px] w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] px-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#B89B72]">◆</span>

                <span className="text-[11px] font-semibold">{priority}</span>
              </div>

              <ChevronDown size={15} />
            </button>

            {showPriorityMenu && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {priorities.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setPriority(item);
                      setShowPriorityMenu(false);
                    }}
                    className={`rounded-[14px] px-3 py-3 text-left text-[9px] font-medium ${
                      priority === item
                        ? "bg-[#171512] text-[#D1B58B]"
                        : "bg-[#F3EEE6] text-[#665746]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* ASSIGNEE */}

          <section className="mt-5">
            <label className="text-[9px] font-medium text-[#665746]">
              Assignee
            </label>

            <button
              type="button"
              onClick={() => setShowAssigneeMenu((value) => !value)}
              className="mt-2 flex h-[56px] w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] px-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171512] text-[8px] font-semibold text-white">
                  {team.find((member) => member.name === assignee)?.initials ||
                    "RN"}
                </div>

                <div className="text-left">
                  <p className="text-[10px] font-semibold">{assignee}</p>

                  <p className="mt-[1px] text-[7px] text-[#9B8E7E]">
                    Assigned user
                  </p>
                </div>
              </div>

              <ChevronDown size={15} />
            </button>

            {showAssigneeMenu && (
              <div className="mt-2 space-y-2 rounded-[18px] bg-[#F3EEE6] p-2">
                {team.map((member) => (
                  <button
                    type="button"
                    key={member.name}
                    onClick={() => {
                      setAssignee(member.name);
                      setShowAssigneeMenu(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-[14px] p-3 text-left ${
                      assignee === member.name
                        ? "bg-[#171512] text-white"
                        : "bg-[#FFFCF7] text-[#171512]"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[7px] font-semibold ${
                        assignee === member.name
                          ? "bg-[#D1B58B] text-[#171512]"
                          : "bg-[#171512] text-white"
                      }`}
                    >
                      {member.initials}
                    </div>

                    <div>
                      <p className="text-[9px] font-semibold">{member.name}</p>

                      <p
                        className={`mt-[1px] text-[7px] ${
                          assignee === member.name
                            ? "text-white/40"
                            : "text-[#9B8E7E]"
                        }`}
                      >
                        {member.role}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* STATUS */}

          <section className="mt-5">
            <label className="text-[9px] font-medium text-[#665746]">
              Status
            </label>

            <button
              type="button"
              onClick={() => setShowStatusMenu((value) => !value)}
              className="mt-2 flex h-[52px] w-full items-center justify-between rounded-[18px] bg-[#171512] px-4 text-white"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D1B58B]" />

                <span className="text-[10px] font-semibold">{status}</span>
              </div>

              <ChevronDown size={15} className="text-[#D1B58B]" />
            </button>

            {showStatusMenu && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {statuses.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setStatus(item);
                      setShowStatusMenu(false);
                    }}
                    className={`rounded-[14px] px-3 py-3 text-left text-[9px] font-medium ${
                      status === item
                        ? "bg-[#B89B72] text-[#171512]"
                        : "bg-[#F3EEE6] text-[#665746]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* LABELS */}

          <section className="mt-5">
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-[#8C8173]" />

              <label className="text-[9px] font-medium text-[#665746]">
                Labels
              </label>
            </div>

            {labels.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {labels.map((label) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => removeLabel(label)}
                    className="rounded-full bg-[#EEE5D9] px-3 py-2 text-[8px] font-medium text-[#665746]"
                  >
                    {label} ×
                  </button>
                ))}
              </div>
            )}

            <div className="mt-2 flex gap-2">
              <input
                value={labelInput}
                onChange={(event) => setLabelInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addLabel();
                  }
                }}
                placeholder="frontend, api, production..."
                className="h-[48px] min-w-0 flex-1 rounded-[16px] bg-[#F3EEE6] px-4 text-[9px] outline-none placeholder:text-[#9B8E7E]"
              />

              <button
                type="button"
                onClick={addLabel}
                className="flex h-[48px] w-[48px] items-center justify-center rounded-[16px] bg-[#171512] text-[#D1B58B]"
              >
                <Plus size={16} />
              </button>
            </div>
          </section>

          {/* STORY POINTS + DATE */}

          <section className="mt-5 grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[9px] font-medium text-[#665746]">
                Story points
              </label>

              <input
                type="number"
                value={storyPoints}
                onChange={(event) => setStoryPoints(event.target.value)}
                placeholder="0"
                className="mt-2 h-[52px] w-full rounded-[17px] bg-[#F3EEE6] px-4 text-[10px] outline-none"
              />
            </div>

            <div>
              <label className="text-[9px] font-medium text-[#665746]">
                Due date
              </label>

              <div className="relative mt-2">
                <CalendarDays
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8173]"
                />

                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="h-[52px] w-full rounded-[17px] bg-[#F3EEE6] pl-9 pr-2 text-[8px] outline-none"
                />
              </div>
            </div>
          </section>

          {/* CREATE */}

          <button
            type="submit"
            className="mt-8 flex h-[58px] w-full items-center justify-between rounded-[19px] bg-[#171512] px-4 text-white transition active:scale-[0.985]"
          >
            <div className="text-left">
              <p className="text-[11px] font-semibold">Create issue</p>

              <p className="mt-[1px] text-[8px] text-white/35">
                Add to Quantum Flow
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#D1B58B] text-[#171512]">
              <CheckCircle2 size={17} />
            </div>
          </button>
        </form>
      </div>
      <BottomDock />
    </MobileShell>
  );
};

export default CreateIssue;
