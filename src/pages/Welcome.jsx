import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MobileShell from "../components/MobileShell";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <div className="flex h-[100dvh] flex-col overflow-hidden px-5 pb-5 pt-5 sm:h-[calc(100dvh-32px)]">
        {/* TOP */}

        <header className="flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#171512] text-[18px] text-[#D1B58B]">
              ⬢
            </div>

            <div>
              <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#9B8E7E]">
                IT Workspace
              </p>

              <h1 className="mt-[1px] text-[13px] font-semibold tracking-[-0.02em] text-[#171512]">
                Quantum Flow
              </h1>
            </div>
          </div>

          <span className="rounded-full border border-[#171512]/[0.07] px-2.5 py-1.5 text-[8px] font-medium text-[#9B8E7E]">
            v1.0
          </span>
        </header>

        {/* CENTER CONTENT */}

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#171512] px-3 py-1.5 text-[9px] font-medium text-[#FFFCF7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D1B58B]" />
              Built for modern IT teams
            </div>

            <h2 className="mt-5 text-[34px] font-semibold leading-[0.96] tracking-[-0.055em] text-[#171512]">
              Manage work.
              <br />
              Resolve faster.
              <br />
              Stay in flow.
            </h2>

            <p className="mt-4 max-w-[300px] text-[11px] leading-[17px] text-[#8C8173]">
              Tickets, bugs, tasks, assets, workflows and team collaboration in
              one clean workspace.
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.1,
            }}
            className="mt-6 grid grid-cols-2 gap-2.5"
          >
            {/* WORKFLOW */}

            <div className="rounded-[20px] bg-[#F3EEE6] p-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#FFFCF7] text-[#665746] shadow-[0_4px_16px_rgba(43,36,28,0.04)]">
                <Workflow size={16} strokeWidth={1.8} />
              </div>

              <div className="mt-5">
                <h3 className="text-[11px] font-semibold text-[#171512]">
                  Smart workflows
                </h3>

                <p className="mt-1 text-[8px] leading-[13px] text-[#8C8173]">
                  Move work from open to QA and done.
                </p>
              </div>
            </div>

            {/* WORKSPACE */}

            <div className="rounded-[20px] bg-[#171512] p-3.5 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/[0.07] text-[#D1B58B]">
                <ShieldCheck size={16} strokeWidth={1.8} />
              </div>

              <div className="mt-5">
                <h3 className="text-[11px] font-semibold">One workspace</h3>

                <p className="mt-1 text-[8px] leading-[13px] text-white/40">
                  Track incidents, teams, assets and changes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM BUTTON */}

        <motion.button
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          onClick={() => navigate("/login")}
          className="group flex h-[54px] shrink-0 items-center justify-between rounded-[18px] bg-[#171512] px-4 text-[#FFFCF7] transition active:scale-[0.985]"
        >
          <div className="text-left">
            <p className="text-[10px] font-semibold">Enter workspace</p>

            <p className="mt-[1px] text-[7px] text-white/35">
              Continue to Quantum Flow
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D1B58B] text-[#171512]">
            <ArrowRight size={15} />
          </div>
        </motion.button>
      </div>
    </MobileShell>
  );
};

export default Welcome;
