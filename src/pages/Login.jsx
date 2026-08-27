import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MobileShell from "../components/MobileShell";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <MobileShell>
      <div className="flex h-[100dvh] flex-col overflow-hidden px-5 pb-5 pt-5 sm:h-[calc(100dvh-32px)]">
        {/* BACK */}

        <header className="shrink-0">
          <button
            onClick={() => navigate("/")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#171512]/[0.08] bg-[#FFFCF7] text-[#171512] transition active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
        </header>

        {/* MAIN */}

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <div className="mb-5 flex h-[48px] w-[48px] items-center justify-center rounded-[16px] bg-[#171512] text-[19px] text-[#D1B58B]">
              ⬢
            </div>

            <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#9B8E7E]">
              Quantum Flow
            </p>

            <h1 className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.05em] text-[#171512]">
              Welcome back.
            </h1>

            <p className="mt-3 text-[10px] leading-[16px] text-[#8C8173]">
              Sign in to manage your team, issues and workspace.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleLogin}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.08,
            }}
            className="mt-6 space-y-3.5"
          >
            {/* EMAIL */}

            <div>
              <label className="mb-1.5 block text-[8px] font-medium text-[#665746]">
                Work email
              </label>

              <div className="flex h-[46px] items-center gap-3 rounded-[16px] bg-[#F3EEE6] px-4">
                <Mail size={15} className="text-[#9B8E7E]" />

                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="min-w-0 flex-1 bg-transparent text-[10px] text-[#171512] outline-none placeholder:text-[#9B8E7E]/60"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[8px] font-medium text-[#665746]">
                  Password
                </label>

                <button type="button" className="text-[7px] text-[#9B8E7E]">
                  Forgot password?
                </button>
              </div>

              <div className="flex h-[46px] items-center gap-3 rounded-[16px] bg-[#F3EEE6] px-4">
                <LockKeyhole size={15} className="text-[#9B8E7E]" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="min-w-0 flex-1 bg-transparent text-[10px] text-[#171512] outline-none placeholder:text-[#9B8E7E]/60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-[#9B8E7E]"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* LOGIN */}

            <button
              type="submit"
              className="group flex h-[54px] w-full items-center justify-between rounded-[18px] bg-[#171512] px-4 text-[#FFFCF7] transition active:scale-[0.985]"
            >
              <span className="text-[10px] font-semibold">Sign in</span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D1B58B] text-[#171512]">
                <ArrowRight size={15} />
              </span>
            </button>
          </motion.form>

          {/* DIVIDER */}

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#171512]/[0.07]" />

            <span className="text-[7px] uppercase tracking-[0.18em] text-[#9B8E7E]">
              or continue with
            </span>

            <span className="h-px flex-1 bg-[#171512]/[0.07]" />
          </div>

          {/* GITHUB */}

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex h-[46px] w-full items-center justify-center gap-2.5 rounded-[16px] border border-[#171512]/[0.08] bg-[#FFFCF7] text-[9px] font-medium text-[#171512] transition active:scale-[0.985]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#171512] text-[7px] font-semibold text-[#D1B58B]">
              GH
            </span>
            Continue with GitHub
          </button>
        </div>

        {/* TERMS */}

        <p className="shrink-0 text-center text-[7px] leading-[12px] text-[#9B8E7E]">
          By continuing, you agree to Quantum Flow workspace policies.
        </p>
      </div>
    </MobileShell>
  );
};

export default Login;
