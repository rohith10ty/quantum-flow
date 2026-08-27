import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CircleUserRound,
  KeyRound,
  Link2,
  LogOut,
  Moon,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";

const Toggle = ({ enabled, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-[24px] w-[42px] rounded-full transition ${
        enabled ? "bg-[#B89B72]" : "bg-[#DDD5CA]"
      }`}
    >
      <motion.span
        animate={{
          x: enabled ? 18 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 32,
        }}
        className="absolute left-0 top-[2px] h-5 w-5 rounded-full bg-[#FFFCF7] shadow-sm"
      />
    </button>
  );
};

const Settings = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [assignments, setAssignments] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <MobileShell className="pb-28">
      <div className="min-h-[100dvh] bg-[#FFFCF7] pb-8">
        <header className="sticky top-0 z-30 border-b border-[#171512]/[0.04] bg-[#FFFCF7]/95 px-5 pb-4 pt-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#171512]/[0.07] bg-[#FFFCF7]"
            >
              <ArrowLeft size={17} />
            </button>

            <div className="text-center">
              <p className="text-[8px] uppercase tracking-[0.18em] text-[#9B8E7E]">
                Quantum Flow
              </p>

              <h1 className="mt-[2px] text-[13px] font-semibold text-[#171512]">
                Settings
              </h1>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#171512] text-[#D1B58B]">
              ⬢
            </div>
          </div>
        </header>

        <div className="px-5 pt-5">
          <section>
            <p className="text-[9px] text-[#9B8E7E]">Account</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Personal settings
            </h2>

            <div className="mt-3 overflow-hidden rounded-[22px] border border-[#171512]/[0.055]">
              <button className="flex w-full items-center justify-between border-b border-[#171512]/[0.05] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6]">
                    <CircleUserRound size={16} className="text-[#665746]" />
                  </div>

                  <div className="text-left">
                    <p className="text-[9px] font-semibold text-[#171512]">
                      Profile information
                    </p>

                    <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                      Name, role and personal details
                    </p>
                  </div>
                </div>

                <ChevronRight size={14} className="text-[#9B8E7E]" />
              </button>

              <button className="flex w-full items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6]">
                    <KeyRound size={16} className="text-[#665746]" />
                  </div>

                  <div className="text-left">
                    <p className="text-[9px] font-semibold text-[#171512]">
                      Password & security
                    </p>

                    <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                      Password and authentication
                    </p>
                  </div>
                </div>

                <ChevronRight size={14} className="text-[#9B8E7E]" />
              </button>
            </div>
          </section>

          <section className="mt-7">
            <p className="text-[9px] text-[#9B8E7E]">Notifications</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Alert preferences
            </h2>

            <div className="mt-3 overflow-hidden rounded-[22px] bg-[#F3EEE6]">
              <div className="flex items-center justify-between border-b border-[#171512]/[0.05] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#FFFCF7]">
                    <Bell size={15} className="text-[#665746]" />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold">
                      Push notifications
                    </p>

                    <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                      Receive workspace alerts
                    </p>
                  </div>
                </div>

                <Toggle
                  enabled={notifications}
                  onClick={() => setNotifications((value) => !value)}
                />
              </div>

              <div className="flex items-center justify-between border-b border-[#171512]/[0.05] p-4">
                <div>
                  <p className="text-[9px] font-semibold">Mentions</p>

                  <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                    Alerts when someone mentions you
                  </p>
                </div>

                <Toggle
                  enabled={mentions}
                  onClick={() => setMentions((value) => !value)}
                />
              </div>

              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-[9px] font-semibold">Assignments</p>

                  <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                    Alerts when issues are assigned
                  </p>
                </div>

                <Toggle
                  enabled={assignments}
                  onClick={() => setAssignments((value) => !value)}
                />
              </div>
            </div>
          </section>

          <section className="mt-7">
            <p className="text-[9px] text-[#9B8E7E]">Appearance</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Display
            </h2>

            <div className="mt-3 rounded-[22px] bg-[#171512] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-white/[0.07]">
                    <Moon size={16} className="text-[#D1B58B]" />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold">Dark mode</p>

                    <p className="mt-[2px] text-[7px] text-white/35">
                      Switch workspace appearance
                    </p>
                  </div>
                </div>

                <Toggle
                  enabled={darkMode}
                  onClick={() => setDarkMode((value) => !value)}
                />
              </div>
            </div>
          </section>

          <section className="mt-7">
            <p className="text-[9px] text-[#9B8E7E]">Workspace</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Management
            </h2>

            <div className="mt-3 space-y-2">
              <button className="flex w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] p-4">
                <div className="flex items-center gap-3">
                  <UsersRound size={15} className="text-[#665746]" />

                  <span className="text-[9px] font-semibold">Team members</span>
                </div>

                <ChevronRight size={14} className="text-[#8C8173]" />
              </button>

              <button
                onClick={() => navigate("/integrations")}
                className="flex w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] p-4"
              >
                <div className="flex items-center gap-3">
                  <Link2 size={15} className="text-[#665746]" />

                  <span className="text-[9px] font-semibold">Integrations</span>
                </div>

                <ChevronRight size={14} className="text-[#8C8173]" />
              </button>

              <button className="flex w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] p-4">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal size={15} className="text-[#665746]" />

                  <span className="text-[9px] font-semibold">
                    Workspace preferences
                  </span>
                </div>

                <ChevronRight size={14} className="text-[#8C8173]" />
              </button>

              <button className="flex w-full items-center justify-between rounded-[18px] bg-[#F3EEE6] p-4">
                <div className="flex items-center gap-3">
                  <Smartphone size={15} className="text-[#665746]" />

                  <span className="text-[9px] font-semibold">
                    Device sessions
                  </span>
                </div>

                <ChevronRight size={14} className="text-[#8C8173]" />
              </button>
            </div>
          </section>

          <section className="mt-7">
            <div className="rounded-[22px] border border-[#171512]/[0.06] bg-[#FFFCF7] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6]">
                  <ShieldCheck size={16} className="text-[#665746]" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold text-[#171512]">
                    Quantum Security
                  </p>

                  <p className="mt-1 text-[7px] leading-[12px] text-[#9B8E7E]">
                    Your workspace uses secure sessions and protected
                    authentication.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <button
            onClick={() => navigate("/")}
            className="mt-7 flex h-[52px] w-full items-center justify-center gap-2 rounded-[18px] bg-[#171512] text-[9px] font-semibold text-[#D1B58B]"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>
      <BottomDock />
    </MobileShell>
  );
};

export default Settings;
