import { motion } from "framer-motion";

import { Bell, BriefcaseBusiness, House, Plus, UserRound } from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    id: "home",
    label: "Home",
    icon: House,
    path: "/dashboard",
  },
  {
    id: "work",
    label: "Work",
    icon: BriefcaseBusiness,
    path: "/work",
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: Bell,
    path: "/notifications",
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserRound,
    path: "/profile",
  },
];

const BottomDock = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActive = () => {
    if (location.pathname === "/dashboard") {
      return "home";
    }

    if (
      location.pathname.startsWith("/work") ||
      location.pathname.startsWith("/board") ||
      location.pathname.startsWith("/issue")
    ) {
      return "work";
    }

    if (location.pathname.startsWith("/notifications")) {
      return "inbox";
    }

    if (
      location.pathname.startsWith("/profile") ||
      location.pathname.startsWith("/settings") ||
      location.pathname.startsWith("/integrations")
    ) {
      return "profile";
    }

    return "";
  };

  const active = getActive();

  const NavButton = ({ item }) => {
    const Icon = item.icon;
    const isActive = active === item.id;

    return (
      <button
        type="button"
        onClick={() => navigate(item.path)}
        className="
          relative
          flex
          h-[48px]
          min-w-0
          flex-1
          items-center
          justify-center
        "
      >
        {isActive && (
          <motion.div
            layoutId="quantum-dock-active"
            transition={{
              type: "spring",
              stiffness: 460,
              damping: 36,
            }}
            className="
              absolute
              h-[42px]
              w-[48px]
              rounded-[15px]
              bg-[#FFFCF7]
            "
          />
        )}

        <div
          className="
            relative
            z-10
            flex
            flex-col
            items-center
            justify-center
            gap-[2px]
          "
        >
          <Icon
            size={16}
            strokeWidth={1.8}
            className={isActive ? "text-[#171512]" : "text-[#FFFCF7]/40"}
          />

          <span
            className={`text-[7px] font-medium ${
              isActive ? "text-[#171512]" : "text-[#FFFCF7]/35"
            }`}
          >
            {item.label}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div
      className="
        pointer-events-none
        fixed
        bottom-0
        left-1/2
        z-50

        w-full
        max-w-[360px]

        -translate-x-1/2

        px-3
        pb-[max(10px,env(safe-area-inset-bottom))]
      "
    >
      <nav
        className="
          pointer-events-auto

          grid
          h-[64px]
          grid-cols-[1fr_1fr_60px_1fr_1fr]
          items-center

          rounded-[22px]

          border
          border-white/[0.07]

          bg-[#171512]

          px-1.5

          shadow-[0_16px_40px_rgba(30,25,19,0.24)]
        "
      >
        <NavButton item={navItems[0]} />

        <NavButton item={navItems[1]} />

        {/* CREATE */}

        <div className="flex h-full items-center justify-center">
          <motion.button
            type="button"
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => navigate("/create")}
            className="
              flex
              h-[46px]
              w-[46px]
              items-center
              justify-center

              rounded-[15px]

              bg-[#B89B72]

              text-[#171512]

              shadow-[0_6px_18px_rgba(184,155,114,0.25)]
            "
          >
            <Plus size={20} strokeWidth={1.9} />
          </motion.button>
        </div>

        <NavButton item={navItems[2]} />

        <NavButton item={navItems[3]} />
      </nav>
    </div>
  );
};

export default BottomDock;
