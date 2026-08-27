import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  GitBranch,
  KeyRound,
  Link2,
  Plus,
  RefreshCcw,
  Server,
  ShieldCheck,
  Unplug,
  Webhook,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";

const Integrations = () => {
  const navigate = useNavigate();

  const [githubConnected, setGithubConnected] = useState(true);
  const [apiCopied, setApiCopied] = useState(false);
  const [webhookEnabled, setWebhookEnabled] = useState(true);

  const [repositories, setRepositories] = useState([
    {
      id: 1,
      name: "quantum-flow",
      branch: "main",
      status: "Synced",
    },
    {
      id: 2,
      name: "quantum-api",
      branch: "develop",
      status: "Synced",
    },
    {
      id: 3,
      name: "quantum-mobile",
      branch: "main",
      status: "Pending",
    },
  ]);

  const copyApiKey = () => {
    setApiCopied(true);

    setTimeout(() => {
      setApiCopied(false);
    }, 1800);
  };

  const refreshRepository = (id) => {
    setRepositories((current) =>
      current.map((repo) =>
        repo.id === id
          ? {
              ...repo,
              status: "Syncing",
            }
          : repo,
      ),
    );

    setTimeout(() => {
      setRepositories((current) =>
        current.map((repo) =>
          repo.id === id
            ? {
                ...repo,
                status: "Synced",
              }
            : repo,
        ),
      );
    }, 1000);
  };

  return (
    <MobileShell className="pb-28">
      <div className="min-h-[100dvh] bg-[#FFFCF7] pb-8">
        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-[#171512]/[0.04] bg-[#FFFCF7]/95 px-5 pb-4 pt-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#171512]/[0.07]"
            >
              <ArrowLeft size={17} />
            </button>

            <div className="text-center">
              <p className="text-[8px] uppercase tracking-[0.18em] text-[#9B8E7E]">
                Quantum Flow
              </p>

              <h1 className="mt-[2px] text-[13px] font-semibold text-[#171512]">
                Integrations
              </h1>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#171512] text-[#D1B58B]">
              ⬢
            </div>
          </div>
        </header>

        <div className="px-5 pt-5">
          {/* INTRO */}

          <motion.section
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[24px] bg-[#171512] p-5 text-white"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-[0.15em] text-[#D1B58B]">
                  Connected workspace
                </p>

                <h2 className="mt-1 text-[20px] font-semibold tracking-[-0.035em]">
                  Build your ecosystem
                </h2>

                <p className="mt-2 max-w-[235px] text-[8px] leading-[13px] text-white/35">
                  Connect source control, APIs and external systems with Quantum
                  Flow.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-white/[0.07] text-[#D1B58B]">
                <Link2 size={16} />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-[13px] bg-white/[0.06] p-3">
                <p className="text-[7px] text-white/30">Connected</p>

                <p className="mt-1 text-[15px] font-semibold">03</p>
              </div>

              <div className="rounded-[13px] bg-white/[0.06] p-3">
                <p className="text-[7px] text-white/30">Repositories</p>

                <p className="mt-1 text-[15px] font-semibold">
                  {repositories.length}
                </p>
              </div>

              <div className="rounded-[13px] bg-[#D1B58B] p-3 text-[#171512]">
                <p className="text-[7px] text-[#171512]/50">Health</p>

                <p className="mt-1 text-[15px] font-semibold">Good</p>
              </div>
            </div>
          </motion.section>

          {/* GITHUB */}

          <section className="mt-7">
            <p className="text-[9px] text-[#9B8E7E]">Source control</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Git connection
            </h2>

            <div className="mt-3 rounded-[22px] border border-[#171512]/[0.055] bg-[#FFFCF7] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#171512] text-[#D1B58B]">
                    <GitBranch size={17} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[11px] font-semibold text-[#171512]">
                        GitHub
                      </h3>

                      {githubConnected && (
                        <span className="rounded-full bg-[#EEE5D9] px-2 py-1 text-[7px] font-medium text-[#665746]">
                          Connected
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-[8px] text-[#9B8E7E]">
                      Source control integration
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setGithubConnected((value) => !value)}
                  className={`flex h-9 w-9 items-center justify-center rounded-[13px] ${
                    githubConnected
                      ? "bg-[#F3EEE6] text-[#665746]"
                      : "bg-[#171512] text-[#D1B58B]"
                  }`}
                >
                  {githubConnected ? <Unplug size={14} /> : <Link2 size={14} />}
                </button>
              </div>

              <div className="mt-4 rounded-[16px] bg-[#F3EEE6] p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[7px] text-[#9B8E7E]">Account</p>

                    <p className="mt-[2px] text-[9px] font-semibold text-[#171512]">
                      rohithnaidu
                    </p>
                  </div>

                  <ExternalLink size={13} className="text-[#8C8173]" />
                </div>
              </div>
            </div>
          </section>

          {/* REPOSITORIES */}

          <section className="mt-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] text-[#9B8E7E]">Development</p>

                <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
                  Repositories
                </h2>
              </div>

              <button className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#F3EEE6] text-[#665746]">
                <Plus size={15} />
              </button>
            </div>

            <div className="mt-3 overflow-hidden rounded-[22px] border border-[#171512]/[0.055]">
              {repositories.map((repo, index) => (
                <div
                  key={repo.id}
                  className={`flex items-center gap-3 p-4 ${
                    index !== repositories.length - 1
                      ? "border-b border-[#171512]/[0.05]"
                      : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#F3EEE6] text-[#665746]">
                    <Code2 size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-semibold text-[#171512]">
                      {repo.name}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <GitBranch size={9} className="text-[#9B8E7E]" />

                      <span className="text-[7px] text-[#8C8173]">
                        {repo.branch}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-[#B89B72]" />

                      <span className="text-[7px] text-[#8C8173]">
                        {repo.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => refreshRepository(repo.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-[#F3EEE6] text-[#665746]"
                  >
                    {repo.status === "Syncing" ? (
                      <RefreshCcw size={13} className="animate-spin" />
                    ) : (
                      <RefreshCcw size={13} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* API */}

          <section className="mt-7">
            <p className="text-[9px] text-[#9B8E7E]">Developer access</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              API tokens
            </h2>

            <div className="mt-3 rounded-[22px] bg-[#F3EEE6] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#FFFCF7] text-[#665746]">
                    <KeyRound size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold text-[#171512]">
                      Production API key
                    </p>

                    <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                      Created 12 Aug 2026
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-[#EEE5D9] px-2 py-1 text-[7px] text-[#665746]">
                  Active
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-[15px] bg-[#FFFCF7] p-3">
                <code className="min-w-0 flex-1 truncate text-[8px] text-[#665746]">
                  qf_live_••••••••••••8F2A
                </code>

                <button
                  onClick={copyApiKey}
                  className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-[#171512] text-[#D1B58B]"
                >
                  {apiCopied ? <Check size={13} /> : <Copy size={13} />}
                </button>
              </div>

              <button className="mt-3 flex h-[42px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#171512] text-[8px] font-semibold text-[#D1B58B]">
                <Plus size={12} />
                Generate new token
              </button>
            </div>
          </section>

          {/* WEBHOOK */}

          <section className="mt-7">
            <p className="text-[9px] text-[#9B8E7E]">Automation</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Webhooks
            </h2>

            <div className="mt-3 rounded-[22px] border border-[#171512]/[0.055] p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#F3EEE6] text-[#665746]">
                    <Webhook size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold">Issue events</p>

                    <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                      Send issue updates to external services
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setWebhookEnabled((value) => !value)}
                  className={`relative h-[24px] w-[42px] rounded-full transition ${
                    webhookEnabled ? "bg-[#B89B72]" : "bg-[#DDD5CA]"
                  }`}
                >
                  <motion.span
                    animate={{
                      x: webhookEnabled ? 18 : 2,
                    }}
                    className="absolute left-0 top-[2px] h-5 w-5 rounded-full bg-[#FFFCF7] shadow-sm"
                  />
                </button>
              </div>

              <div className="mt-4 rounded-[15px] bg-[#F3EEE6] p-3">
                <p className="text-[7px] text-[#9B8E7E]">Endpoint</p>

                <p className="mt-[2px] truncate text-[8px] font-medium text-[#665746]">
                  https://api.quantumflow.dev/webhooks/issues
                </p>
              </div>
            </div>
          </section>

          {/* RECENT ACTIVITY */}

          <section className="mt-7">
            <p className="text-[9px] text-[#9B8E7E]">Activity</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              Recent syncs
            </h2>

            <div className="mt-3 space-y-3 border-l border-[#171512]/10 pl-4">
              <div className="relative">
                <span className="absolute -left-[20px] top-1 h-2 w-2 rounded-full bg-[#B89B72]" />

                <p className="text-[8px] text-[#665746]">
                  GitHub repository synced successfully
                </p>

                <p className="mt-1 text-[7px] text-[#9B8E7E]">6 minutes ago</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[20px] top-1 h-2 w-2 rounded-full bg-[#B89B72]" />

                <p className="text-[8px] text-[#665746]">
                  Webhook delivered issue update
                </p>

                <p className="mt-1 text-[7px] text-[#9B8E7E]">31 minutes ago</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[20px] top-1 h-2 w-2 rounded-full bg-[#B89B72]" />

                <p className="text-[8px] text-[#665746]">
                  API token used by deployment pipeline
                </p>

                <p className="mt-1 text-[7px] text-[#9B8E7E]">1 hour ago</p>
              </div>
            </div>
          </section>

          {/* SECURITY */}

          <section className="mb-4 mt-7">
            <button className="flex w-full items-center justify-between rounded-[20px] bg-[#171512] p-4 text-left text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-white/[0.07] text-[#D1B58B]">
                  <ShieldCheck size={16} />
                </div>

                <div>
                  <p className="text-[9px] font-semibold">
                    Integration security
                  </p>

                  <p className="mt-[2px] text-[7px] text-white/35">
                    Review permissions and access logs
                  </p>
                </div>
              </div>

              <ChevronRight size={14} className="text-[#D1B58B]" />
            </button>
          </section>
        </div>
      </div>
      <BottomDock />
    </MobileShell>
  );
};

export default Integrations;
