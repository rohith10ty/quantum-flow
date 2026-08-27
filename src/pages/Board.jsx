import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bug,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  FileText,
  ListTodo,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";
import { useIssues } from "../context/IssueContext";

const Board = () => {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [activeStatus, setActiveStatus] = useState("Open");
  const { issues, updateIssue } = useIssues();

  const statuses = ["Open", "In Progress", "QA", "Done"];

  const currentIndex = statuses.indexOf(activeStatus);

  const visibleIssues = useMemo(() => {
    return issues.filter((issue) => issue.status === activeStatus);
  }, [issues, activeStatus]);

  const moveIssue = (issueId, direction) => {
    const issue = issues.find((item) => item.id === issueId);

    if (!issue) return;

    const statusIndex = statuses.indexOf(issue.status);

    const nextIndex =
      direction === "next"
        ? Math.min(statusIndex + 1, statuses.length - 1)
        : Math.max(statusIndex - 1, 0);

    updateIssue(issueId, {
      status: statuses[nextIndex],
    });
  };

  const goPreviousStatus = () => {
    if (currentIndex > 0) {
      setActiveStatus(statuses[currentIndex - 1]);
    }
  };

  const goNextStatus = () => {
    if (currentIndex < statuses.length - 1) {
      setActiveStatus(statuses[currentIndex + 1]);
    }
  };

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
      case "Open":
        return CircleDot;
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

  return (
    <MobileShell className="pb-28">
      <header className="sticky top-0 z-30 border-b border-[#171512]/[0.04] bg-[#FFFCF7]/95 px-5 pb-4 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/work")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#171512]/[0.07] bg-[#FFFCF7]"
          >
            <ArrowLeft size={17} />
          </button>

          <div className="text-center">
            <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#9B8E7E]">
              Quantum Flow
            </p>

            <h1 className="mt-[2px] text-[13px] font-semibold text-[#171512]">
              Sprint board
            </h1>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EEE6]">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </header>

      <div className="px-5 pt-5">
        <section className="rounded-[26px] bg-[#171512] p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] text-[#D1B58B]">Current sprint</p>

              <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.04em]">
                Platform Revamp
              </h2>

              <p className="mt-2 text-[9px] leading-4 text-white/35">
                Manage issue flow across the sprint.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/[0.07] text-[#D1B58B]">
              ⬢
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-2">
            {statuses.map((status) => {
              const count = issues.filter(
                (issue) => issue.status === status,
              ).length;

              const active = activeStatus === status;

              return (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`rounded-[14px] px-2 py-3 text-center transition ${
                    active
                      ? "bg-[#D1B58B] text-[#171512]"
                      : "bg-white/[0.06] text-white/40"
                  }`}
                >
                  <p className="text-[13px] font-semibold">{count}</p>

                  <p className="mt-1 text-[7px] leading-3">{status}</p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {statuses.map((status) => {
            const active = activeStatus === status;

            return (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`shrink-0 rounded-full px-4 py-2 text-[9px] font-medium transition ${
                  active
                    ? "bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#F3EEE6] text-[#8C8173]"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[9px] text-[#9B8E7E]">Workflow</p>

            <h2 className="mt-[2px] text-[20px] font-semibold tracking-[-0.035em] text-[#171512]">
              {activeStatus}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goPreviousStatus}
              disabled={currentIndex === 0}
              className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#F3EEE6] text-[#665746] disabled:opacity-25"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={goNextStatus}
              disabled={currentIndex === statuses.length - 1}
              className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#171512] text-[#D1B58B] disabled:opacity-25"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStatus}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22 }}
            className="mt-3 space-y-3"
          >
            {visibleIssues.map((issue) => {
              const TypeIcon = getTypeIcon(issue.type);
              const StatusIcon = getStatusIcon(issue.status);

              const issueStatusIndex = statuses.indexOf(issue.status);

              return (
                <motion.article
                  layout
                  key={issue.id}
                  className="rounded-[23px] border border-[#171512]/[0.055] bg-[#FFFCF7] p-4"
                >
                  <button
                    onClick={() => navigate(`/issue/${issue.id}`)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#F3EEE6] text-[#665746]">
                        <TypeIcon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-semibold text-[#9B8E7E]">
                            {issue.id}
                          </span>

                          <span className="rounded-full bg-[#EEE5D9] px-2 py-[3px] text-[7px] font-medium text-[#665746]">
                            {issue.type}
                          </span>
                        </div>

                        <h3 className="mt-1.5 text-[12px] font-semibold leading-[17px] text-[#171512]">
                          {issue.title}
                        </h3>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171512] text-[7px] font-semibold text-white">
                        {issue.assignee}
                      </div>
                    </div>
                  </button>

                  <div className="mt-4 flex items-center justify-between border-t border-[#171512]/[0.05] pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 rounded-full bg-[#F3EEE6] px-2.5 py-1.5">
                        <StatusIcon size={10} />

                        <span className="text-[8px] font-medium text-[#665746]">
                          {issue.status}
                        </span>
                      </div>

                      <span className="h-1 w-1 rounded-full bg-[#B89B72]" />

                      <span className="text-[8px] text-[#8C8173]">
                        {issue.priority}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      disabled={issueStatusIndex === 0}
                      onClick={() => moveIssue(issue.id, "previous")}
                      className="flex h-[40px] items-center justify-center gap-1.5 rounded-[14px] bg-[#F3EEE6] text-[8px] font-semibold text-[#665746] transition active:scale-[0.98] disabled:opacity-25"
                    >
                      <ArrowLeft size={12} />
                      Previous
                    </button>

                    <button
                      disabled={issueStatusIndex === statuses.length - 1}
                      onClick={() => moveIssue(issue.id, "next")}
                      className="flex h-[40px] items-center justify-center gap-1.5 rounded-[14px] bg-[#171512] text-[8px] font-semibold text-[#D1B58B] transition active:scale-[0.98] disabled:opacity-25"
                    >
                      Move forward
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.article>
              );
            })}

            {visibleIssues.length === 0 && (
              <div className="py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#F3EEE6] text-[#8C8173]">
                  <CheckCircle2 size={20} />
                </div>

                <h3 className="mt-4 text-[12px] font-semibold text-[#171512]">
                  Nothing here
                </h3>

                <p className="mt-1 text-[9px] text-[#9B8E7E]">
                  No issues are currently in {activeStatus}.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomDock onCreate={() => setShowCreate(true)} />

      {showCreate && (
        <div
          onClick={() => setShowCreate(false)}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#171512]/45 px-3 pb-3 backdrop-blur-[4px]"
        >
          <motion.div
            initial={{
              y: 150,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[390px] rounded-[30px] bg-[#FFFCF7] p-5"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-[#171512]/10" />

            <p className="mt-5 text-[9px] text-[#9B8E7E]">Quick create</p>

            <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.04em] text-[#171512]">
              Create new work
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {["Bug", "Story", "Task", "Sub-task"].map((type) => (
                <button
                  key={type}
                  className="rounded-[18px] bg-[#F3EEE6] p-4 text-left text-[10px] font-semibold text-[#171512]"
                >
                  {type}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowCreate(false)}
              className="mt-4 h-[50px] w-full rounded-[17px] bg-[#171512] text-[10px] font-semibold text-white"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </MobileShell>
  );
};

export default Board;
