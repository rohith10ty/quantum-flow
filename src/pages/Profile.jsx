import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  CheckCircle2,
  ChevronRight,
  Code2,
  GitBranch,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";
import { useIssues } from "../context/IssueContext";

const Profile = () => {
  const navigate = useNavigate();
  const { issues } = useIssues();

  const userName = "Rohith Naidu";
  const initials = "RN";

  const assignedIssues = useMemo(() => {
    return issues.filter(
      (issue) => issue.assignee === initials || issue.assigneeName === userName,
    );
  }, [issues]);

  const completedIssues = assignedIssues.filter(
    (issue) => issue.status === "Done",
  ).length;

  const activeIssues = assignedIssues.filter(
    (issue) =>
      issue.status === "Open" ||
      issue.status === "In Progress" ||
      issue.status === "QA",
  ).length;

  const completionRate =
    assignedIssues.length === 0
      ? 0
      : Math.round((completedIssues / assignedIssues.length) * 100);

  const recentWork = assignedIssues.slice(0, 3);

  return (
    <MobileShell className="pb-28">
      {/* HEADER */}

      <header className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.19em] text-[#9B8E7E]">
              Quantum Flow
            </p>

            <h1 className="mt-1 text-[26px] font-semibold tracking-[-0.045em] text-[#171512]">
              Profile
            </h1>

            <p className="mt-1 text-[10px] text-[#8C8173]">
              Your workspace identity and activity.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#171512] text-[19px] text-[#D1B58B]">
            ⬢
          </div>
        </div>
      </header>

      <div className="px-5">
        {/* PROFILE CARD */}

        <motion.section
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-6 overflow-hidden rounded-[26px] bg-[#171512] p-5 text-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[18px] bg-[#D1B58B] text-[13px] font-semibold text-[#171512]">
                {initials}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-[17px] font-semibold tracking-[-0.025em]">
                    {userName}
                  </h2>

                  <BadgeCheck size={14} className="text-[#D1B58B]" />
                </div>

                <p className="mt-[2px] text-[8px] text-white/40">
                  MERN Stack Developer
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/settings")}
              className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-white/[0.07] text-[#D1B58B]"
            >
              <Settings size={15} />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-[14px] bg-white/[0.06] p-3">
              <p className="text-[7px] text-white/30">Assigned</p>

              <p className="mt-1 text-[16px] font-semibold">
                {assignedIssues.length}
              </p>
            </div>

            <div className="rounded-[14px] bg-white/[0.06] p-3">
              <p className="text-[7px] text-white/30">Active</p>

              <p className="mt-1 text-[16px] font-semibold">{activeIssues}</p>
            </div>

            <div className="rounded-[14px] bg-[#D1B58B] p-3 text-[#171512]">
              <p className="text-[7px] text-[#171512]/55">Done</p>

              <p className="mt-1 text-[16px] font-semibold">
                {completedIssues}
              </p>
            </div>
          </div>
        </motion.section>

        {/* COMPLETION */}

        <section className="mt-6 rounded-[22px] bg-[#F3EEE6] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] text-[#9B8E7E]">Personal progress</p>

              <h2 className="mt-[2px] text-[14px] font-semibold text-[#171512]">
                Issue completion
              </h2>
            </div>

            <span className="text-[13px] font-semibold text-[#B89B72]">
              {completionRate}%
            </span>
          </div>

          <div className="mt-4 h-[6px] overflow-hidden rounded-full bg-[#171512]/10">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${completionRate}%`,
              }}
              transition={{
                duration: 0.8,
              }}
              className="h-full rounded-full bg-[#B89B72]"
            />
          </div>
        </section>

        {/* ROLE */}

        <section className="mt-7">
          <p className="text-[9px] text-[#9B8E7E]">Workspace</p>

          <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
            Access & role
          </h2>

          <div className="mt-3 overflow-hidden rounded-[22px] border border-[#171512]/[0.055]">
            <div className="flex items-center justify-between border-b border-[#171512]/[0.05] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6] text-[#665746]">
                  <ShieldCheck size={16} />
                </div>

                <div>
                  <p className="text-[8px] text-[#9B8E7E]">Workspace role</p>

                  <p className="mt-[2px] text-[10px] font-semibold text-[#171512]">
                    Developer
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#EEE5D9] px-2.5 py-1 text-[7px] font-medium text-[#665746]">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6] text-[#665746]">
                  <UsersRound size={16} />
                </div>

                <div>
                  <p className="text-[8px] text-[#9B8E7E]">Team</p>

                  <p className="mt-[2px] text-[10px] font-semibold text-[#171512]">
                    Platform Engineering
                  </p>
                </div>
              </div>

              <ChevronRight size={14} className="text-[#9B8E7E]" />
            </div>
          </div>
        </section>

        {/* RECENT WORK */}

        <section className="mt-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] text-[#9B8E7E]">Activity</p>

              <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
                Recent work
              </h2>
            </div>

            <button
              onClick={() => navigate("/work")}
              className="text-[8px] font-medium text-[#8C8173]"
            >
              View all
            </button>
          </div>

          <div className="mt-3 overflow-hidden rounded-[22px] border border-[#171512]/[0.055] bg-[#FFFCF7]">
            {recentWork.length > 0 ? (
              recentWork.map((issue, index) => (
                <button
                  key={issue.id}
                  onClick={() => navigate(`/issue/${issue.id}`)}
                  className={`flex w-full items-center gap-3 p-4 text-left ${
                    index !== recentWork.length - 1
                      ? "border-b border-[#171512]/[0.05]"
                      : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#F3EEE6]">
                    {issue.status === "Done" ? (
                      <CheckCircle2 size={15} className="text-[#665746]" />
                    ) : (
                      <Code2 size={15} className="text-[#665746]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[7px] font-medium text-[#9B8E7E]">
                      {issue.id}
                    </p>

                    <p className="mt-[2px] truncate text-[9px] font-semibold text-[#171512]">
                      {issue.title}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[7px] text-[#8C8173]">
                        {issue.status}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-[#B89B72]" />

                      <span className="text-[7px] text-[#8C8173]">
                        {issue.priority}
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={14} className="text-[#9B8E7E]" />
                </button>
              ))
            ) : (
              <div className="p-7 text-center">
                <p className="text-[9px] text-[#8C8173]">
                  No assigned work yet.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* DEVELOPMENT */}

        <section className="mt-7">
          <p className="text-[9px] text-[#9B8E7E]">Development</p>

          <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
            Connected tools
          </h2>

          <button
            onClick={() => navigate("/integrations")}
            className="mt-3 flex w-full items-center justify-between rounded-[21px] bg-[#171512] p-4 text-left text-white"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-white/[0.07] text-[#D1B58B]">
                <GitBranch size={16} />
              </div>

              <div>
                <p className="text-[9px] font-semibold">Git & integrations</p>

                <p className="mt-[2px] text-[7px] text-white/35">
                  Manage Git, API and workspace connections
                </p>
              </div>
            </div>

            <ArrowUpRight size={14} className="text-[#D1B58B]" />
          </button>
        </section>

        {/* QUICK SETTINGS */}

        <section className="mb-4 mt-7">
          <p className="text-[9px] text-[#9B8E7E]">Account</p>

          <div className="mt-3 space-y-2">
            <button
              onClick={() => navigate("/notifications")}
              className="flex w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] p-4"
            >
              <div className="flex items-center gap-3">
                <Bell size={15} className="text-[#665746]" />

                <span className="text-[9px] font-semibold">Notifications</span>
              </div>

              <ChevronRight size={14} className="text-[#8C8173]" />
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="flex w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] p-4"
            >
              <div className="flex items-center gap-3">
                <Settings size={15} className="text-[#665746]" />

                <span className="text-[9px] font-semibold">Settings</span>
              </div>

              <ChevronRight size={14} className="text-[#8C8173]" />
            </button>
          </div>
        </section>
      </div>

      <BottomDock />
    </MobileShell>
  );
};

export default Profile;
