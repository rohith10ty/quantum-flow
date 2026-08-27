import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bug,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Code2,
  GitBranch,
  Link2,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Plus,
  Send,
  Tag,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";
import { useIssues } from "../context/IssueContext";

const IssueDetails = () => {
  const navigate = useNavigate();
  const { issueId } = useParams();

  const { getIssue, updateIssue } = useIssues();

  const issue = getIssue(issueId);

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const [status, setStatus] = useState(issue?.status || "Open");

  const [assignee, setAssignee] = useState(
    issue?.assigneeName || "Rohith Naidu",
  );

  const [priority, setPriority] = useState(issue?.priority || "Medium");

  const [labels, setLabels] = useState(issue?.labels || []);

  const [newLabel, setNewLabel] = useState("");
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "AK",
      name: "Arjun K",
      text: "I reproduced this issue and added the details for the team.",
      time: "10:24 AM",
    },
    {
      id: 2,
      user: "RN",
      name: "Rohith Naidu",
      text: "Checking the implementation now. I will update the issue after testing.",
      time: "11:08 AM",
    },
  ]);

  const [subtasks, setSubtasks] = useState([
    {
      id: `${issueId}-1`,
      title: "Review the current implementation",
      done: true,
    },
    {
      id: `${issueId}-2`,
      title: "Implement required changes",
      done: false,
    },
    {
      id: `${issueId}-3`,
      title: "Test and move issue to QA",
      done: false,
    },
  ]);

  const statuses = ["Open", "In Progress", "QA", "Done"];

  const priorities = ["Low", "Medium", "High", "Critical"];

  const teamMembers = [
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

  const completedSubtasks = useMemo(() => {
    return subtasks.filter((item) => item.done).length;
  }, [subtasks]);

  const progress =
    subtasks.length === 0
      ? 0
      : Math.round((completedSubtasks / subtasks.length) * 100);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);

    updateIssue(issueId, {
      status: newStatus,
    });

    setShowStatusMenu(false);
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);

    updateIssue(issueId, {
      priority: newPriority,
    });

    setShowPriorityMenu(false);
  };

  const handleAssigneeChange = (member) => {
    setAssignee(member.name);

    updateIssue(issueId, {
      assignee: member.initials,
      assigneeName: member.name,
    });

    setShowAssigneeMenu(false);
  };

  const addComment = () => {
    if (!comment.trim()) return;

    setComments((current) => [
      ...current,
      {
        id: Date.now(),
        user: "RN",
        name: "Rohith Naidu",
        text: comment.trim(),
        time: "Now",
      },
    ]);

    setComment("");
  };

  const addLabel = () => {
    const value = newLabel.trim().toLowerCase();

    if (!value) return;

    if (!labels.includes(value)) {
      const updatedLabels = [...labels, value];

      setLabels(updatedLabels);

      updateIssue(issueId, {
        labels: updatedLabels,
      });
    }

    setNewLabel("");
  };

  const removeLabel = (label) => {
    const updatedLabels = labels.filter((item) => item !== label);

    setLabels(updatedLabels);

    updateIssue(issueId, {
      labels: updatedLabels,
    });
  };

  const toggleSubtask = (id) => {
    setSubtasks((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              done: !item.done,
            }
          : item,
      ),
    );
  };

  if (!issue) {
    return (
      <MobileShell>
        <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#F3EEE6]">
            <CircleDot size={20} className="text-[#8C8173]" />
          </div>

          <h1 className="mt-4 text-[20px] font-semibold tracking-[-0.03em] text-[#171512]">
            Issue not found
          </h1>

          <p className="mt-2 text-[10px] leading-4 text-[#8C8173]">
            This issue may have been removed or the issue ID is invalid.
          </p>

          <button
            onClick={() => navigate("/work")}
            className="mt-6 rounded-[16px] bg-[#171512] px-5 py-3 text-[9px] font-semibold text-[#D1B58B]"
          >
            Back to work
          </button>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell className="pb-28">
      {/* HEADER */}

      <header className="sticky top-0 z-30 border-b border-[#171512]/[0.04] bg-[#FFFCF7]/95 px-5 pb-4 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#171512]/[0.07] bg-[#FFFCF7] text-[#171512]"
          >
            <ArrowLeft size={17} />
          </button>

          <div className="text-center">
            <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#9B8E7E]">
              Issue details
            </p>

            <p className="mt-[2px] text-[10px] font-semibold text-[#171512]">
              {issue.id}
            </p>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EEE6] text-[#665746]">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </header>

      <div className="px-5 pt-5">
        {/* TITLE */}

        <section>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-[#EEE5D9] text-[#665746]">
              <Bug size={15} strokeWidth={1.8} />
            </div>

            <span className="rounded-full bg-[#EEE5D9] px-2.5 py-1 text-[8px] font-medium text-[#665746]">
              {issue.type}
            </span>
          </div>

          <h1 className="mt-4 text-[27px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#171512]">
            {issue.title}
          </h1>

          <p className="mt-3 text-[10px] leading-[17px] text-[#8C8173]">
            {issue.description || "No description provided for this issue."}
          </p>
        </section>

        {/* WORKFLOW */}

        <section className="mt-7 rounded-[24px] bg-[#171512] p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.14em] text-[#D1B58B]">
                Workflow
              </p>

              <h2 className="mt-1 text-[16px] font-semibold">Issue status</h2>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-white/[0.07]">
              <CircleDot size={15} className="text-[#D1B58B]" />
            </div>
          </div>

          <div className="mt-5 flex items-center">
            {statuses.map((item, index) => {
              const currentIndex = statuses.indexOf(status);

              const completed = index < currentIndex;

              const active = item === status;

              return (
                <div
                  key={item}
                  className="flex flex-1 items-center last:flex-none"
                >
                  <button
                    onClick={() => handleStatusChange(item)}
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
                      completed
                        ? "border-[#D1B58B] bg-[#D1B58B] text-[#171512]"
                        : active
                          ? "border-[#D1B58B] bg-[#171512] text-[#D1B58B]"
                          : "border-white/15 text-white/25"
                    }`}
                  >
                    {completed ? (
                      <Check size={13} strokeWidth={2.5} />
                    ) : (
                      <span className="text-[8px] font-semibold">
                        {index + 1}
                      </span>
                    )}
                  </button>

                  {index < statuses.length - 1 && (
                    <div
                      className={`mx-1 h-[2px] flex-1 rounded-full ${
                        index < currentIndex ? "bg-[#D1B58B]" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex justify-between">
            {statuses.map((item) => (
              <span
                key={item}
                className={`max-w-[55px] text-center text-[7px] leading-3 ${
                  item === status
                    ? "font-semibold text-[#D1B58B]"
                    : "text-white/30"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowStatusMenu((value) => !value)}
            className="mt-5 flex w-full items-center justify-between rounded-[15px] bg-white/[0.07] px-3.5 py-3"
          >
            <div className="text-left">
              <p className="text-[7px] text-white/35">Current status</p>

              <p className="mt-[2px] text-[10px] font-medium text-[#D1B58B]">
                {status}
              </p>
            </div>

            <ChevronDown size={14} />
          </button>

          {showStatusMenu && (
            <motion.div
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-2 grid grid-cols-2 gap-2"
            >
              {statuses.map((item) => (
                <button
                  key={item}
                  onClick={() => handleStatusChange(item)}
                  className={`rounded-[13px] px-3 py-3 text-left text-[9px] ${
                    status === item
                      ? "bg-[#D1B58B] font-semibold text-[#171512]"
                      : "bg-white/[0.06] text-white/55"
                  }`}
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </section>

        {/* OVERVIEW */}

        <section className="mt-7">
          <p className="text-[9px] text-[#9B8E7E]">Issue details</p>

          <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
            Overview
          </h2>

          <div className="mt-3 overflow-hidden rounded-[22px] border border-[#171512]/[0.055] bg-[#FFFCF7]">
            {/* ASSIGNEE */}

            <div className="border-b border-[#171512]/[0.05] p-4">
              <button
                onClick={() => setShowAssigneeMenu((value) => !value)}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6] text-[#665746]">
                    <UserRound size={16} />
                  </div>

                  <div className="text-left">
                    <p className="text-[8px] text-[#9B8E7E]">Assignee</p>

                    <p className="mt-[2px] text-[10px] font-semibold text-[#171512]">
                      {assignee}
                    </p>
                  </div>
                </div>

                <ChevronDown size={14} className="text-[#8C8173]" />
              </button>

              {showAssigneeMenu && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-3 space-y-2 rounded-[17px] bg-[#F3EEE6] p-2"
                >
                  {teamMembers.map((member) => (
                    <button
                      key={member.name}
                      onClick={() => handleAssigneeChange(member)}
                      className={`flex w-full items-center gap-3 rounded-[14px] p-2.5 text-left ${
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
                        <p className="text-[9px] font-semibold">
                          {member.name}
                        </p>

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
                </motion.div>
              )}
            </div>

            {/* PRIORITY */}

            <div className="border-b border-[#171512]/[0.05] p-4">
              <button
                onClick={() => setShowPriorityMenu((value) => !value)}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6]">
                    <span className="text-[14px] text-[#B89B72]">◆</span>
                  </div>

                  <div className="text-left">
                    <p className="text-[8px] text-[#9B8E7E]">Priority</p>

                    <p className="mt-[2px] text-[10px] font-semibold text-[#171512]">
                      {priority}
                    </p>
                  </div>
                </div>

                <ChevronDown size={14} className="text-[#8C8173]" />
              </button>

              {showPriorityMenu && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {priorities.map((item) => (
                    <button
                      key={item}
                      onClick={() => handlePriorityChange(item)}
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
            </div>

            {/* REPORTER */}

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6]">
                  <UserRound size={16} className="text-[#665746]" />
                </div>

                <div>
                  <p className="text-[8px] text-[#9B8E7E]">Reporter</p>

                  <p className="mt-[2px] text-[10px] font-semibold text-[#171512]">
                    Rohith Naidu
                  </p>
                </div>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171512] text-[7px] font-semibold text-white">
                RN
              </div>
            </div>
          </div>
        </section>

        {/* LABELS */}

        <section className="mt-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] text-[#9B8E7E]">Classification</p>

              <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em]">
                Labels
              </h2>
            </div>

            <Tag size={16} className="text-[#8C8173]" />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {labels.length > 0 ? (
              labels.map((label) => (
                <button
                  key={label}
                  onClick={() => removeLabel(label)}
                  className="rounded-full bg-[#EEE5D9] px-3 py-2 text-[8px] font-medium text-[#665746] transition hover:bg-[#171512] hover:text-white"
                >
                  {label} ×
                </button>
              ))
            ) : (
              <p className="text-[9px] text-[#9B8E7E]">No labels added.</p>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={newLabel}
              onChange={(event) => setNewLabel(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addLabel();
                }
              }}
              placeholder="Add label..."
              className="h-[44px] min-w-0 flex-1 rounded-[15px] bg-[#F3EEE6] px-4 text-[9px] outline-none placeholder:text-[#9B8E7E]"
            />

            <button
              onClick={addLabel}
              className="flex h-[44px] w-[44px] items-center justify-center rounded-[15px] bg-[#171512] text-[#D1B58B]"
            >
              <Plus size={16} />
            </button>
          </div>
        </section>

        {/* SUBTASKS */}

        <section className="mt-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] text-[#9B8E7E]">Breakdown</p>

              <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em]">
                Sub-tasks
              </h2>
            </div>

            <span className="text-[9px] font-semibold text-[#8C8173]">
              {completedSubtasks}/{subtasks.length}
            </span>
          </div>

          <div className="mt-3 rounded-[22px] bg-[#F3EEE6] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[8px] text-[#8C8173]">Completion</span>

              <span className="text-[9px] font-semibold text-[#665746]">
                {progress}%
              </span>
            </div>

            <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-[#171512]/10">
              <motion.div
                animate={{
                  width: `${progress}%`,
                }}
                className="h-full rounded-full bg-[#B89B72]"
              />
            </div>

            <div className="mt-4 space-y-2">
              {subtasks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleSubtask(item.id)}
                  className="flex w-full items-center gap-3 rounded-[15px] bg-[#FFFCF7] p-3 text-left"
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] ${
                      item.done
                        ? "bg-[#171512] text-[#D1B58B]"
                        : "border border-[#171512]/10 text-[#9B8E7E]"
                    }`}
                  >
                    {item.done && <Check size={12} />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[7px] text-[#9B8E7E]">{item.id}</p>

                    <p
                      className={`mt-[2px] text-[9px] font-medium ${
                        item.done
                          ? "text-[#8C8173] line-through"
                          : "text-[#171512]"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* GIT CONNECTION */}

        <section className="mt-7">
          <p className="text-[9px] text-[#9B8E7E]">Development</p>

          <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em]">
            Git connection
          </h2>

          <div className="mt-3 rounded-[23px] bg-[#171512] p-4 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-white/[0.07] text-[#D1B58B]">
                  <GitBranch size={17} />
                </div>

                <div>
                  <p className="text-[8px] text-white/35">Linked branch</p>

                  <p className="mt-[2px] text-[10px] font-medium">
                    fix/{issue.id.toLowerCase()}
                  </p>
                </div>
              </div>

              <Link2 size={15} className="text-[#D1B58B]" />
            </div>

            <div className="mt-4 rounded-[16px] bg-white/[0.06] p-3">
              <div className="flex items-center gap-2">
                <Code2 size={13} className="text-[#D1B58B]" />

                <span className="text-[8px] text-white/35">Latest commit</span>
              </div>

              <p className="mt-2 text-[9px] font-medium">
                Update issue implementation
              </p>

              <p className="mt-1 text-[7px] text-white/30">
                8f23a1c • 42 minutes ago
              </p>
            </div>
          </div>
        </section>

        {/* ATTACHMENT */}

        <section className="mt-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-[#9B8E7E]">Resources</p>

              <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em]">
                Attachments
              </h2>
            </div>

            <button className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#F3EEE6]">
              <Plus size={15} />
            </button>
          </div>

          <button className="mt-3 flex w-full items-center gap-3 rounded-[18px] border border-dashed border-[#171512]/10 p-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#F3EEE6]">
              <Paperclip size={15} className="text-[#665746]" />
            </div>

            <div>
              <p className="text-[9px] font-semibold">issue-reference.png</p>

              <p className="mt-[2px] text-[7px] text-[#9B8E7E]">PNG • 248 KB</p>
            </div>
          </button>
        </section>

        {/* COMMENTS */}

        <section className="mt-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] text-[#9B8E7E]">Collaboration</p>

              <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em]">
                Comments
              </h2>
            </div>

            <div className="flex items-center gap-1 text-[8px] text-[#8C8173]">
              <MessageSquare size={12} />
              {comments.length}
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {comments.map((item) => (
              <div
                key={item.id}
                className="rounded-[20px] border border-[#171512]/[0.055] bg-[#FFFCF7] p-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171512] text-[7px] font-semibold text-white">
                    {item.user}
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold">{item.name}</p>

                    <p className="text-[7px] text-[#9B8E7E]">{item.time}</p>
                  </div>
                </div>

                <p className="mt-3 text-[9px] leading-[15px] text-[#665746]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-end gap-2">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Write a comment..."
              rows={2}
              className="min-h-[52px] flex-1 resize-none rounded-[17px] bg-[#F3EEE6] px-4 py-3 text-[9px] leading-4 outline-none placeholder:text-[#9B8E7E]"
            />

            <button
              onClick={addComment}
              className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[17px] bg-[#171512] text-[#D1B58B]"
            >
              <Send size={15} />
            </button>
          </div>
        </section>

        {/* ACTIVITY */}

        <section className="mb-4 mt-7">
          <p className="text-[9px] text-[#9B8E7E]">History</p>

          <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em]">
            Recent activity
          </h2>

          <div className="mt-3 space-y-4 border-l border-[#171512]/10 pl-4">
            <div className="relative">
              <span className="absolute -left-[20px] top-1 h-2 w-2 rounded-full bg-[#B89B72]" />

              <p className="text-[9px] text-[#665746]">
                Status is currently{" "}
                <strong className="font-semibold text-[#171512]">
                  {status}
                </strong>
              </p>

              <p className="mt-1 text-[7px] text-[#9B8E7E]">Latest update</p>
            </div>

            <div className="relative">
              <span className="absolute -left-[20px] top-1 h-2 w-2 rounded-full bg-[#B89B72]" />

              <p className="text-[9px] text-[#665746]">
                Assigned to{" "}
                <strong className="font-semibold text-[#171512]">
                  {assignee}
                </strong>
              </p>

              <p className="mt-1 text-[7px] text-[#9B8E7E]">
                Workspace activity
              </p>
            </div>

            <div className="relative">
              <span className="absolute -left-[20px] top-1 h-2 w-2 rounded-full bg-[#B89B72]" />

              <p className="text-[9px] text-[#665746]">
                Issue{" "}
                <strong className="font-semibold text-[#171512]">
                  {issue.id}
                </strong>{" "}
                created
              </p>

              <p className="mt-1 text-[7px] text-[#9B8E7E]">Quantum Flow</p>
            </div>
          </div>
        </section>
      </div>

      <BottomDock />
    </MobileShell>
  );
};

export default IssueDetails;
