import { motion } from "framer-motion";
import {
  AtSign,
  Bell,
  Bug,
  Check,
  CheckCheck,
  ChevronRight,
  CircleDot,
  GitCommitHorizontal,
  MessageSquare,
  SlidersHorizontal,
  UserRoundPlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";

const initialNotifications = [
  {
    id: 1,
    type: "assignment",
    title: "Issue assigned to you",
    description:
      "Arjun assigned QTM-121 · Fix mobile issue modal overflow to you.",
    time: "2 min ago",
    unread: true,
    issueId: "QTM-121",
  },
  {
    id: 2,
    type: "comment",
    title: "New comment",
    description:
      "Sanjay commented on QTM-102 · Login token expires after refresh.",
    time: "18 min ago",
    unread: true,
    issueId: "QTM-102",
  },
  {
    id: 3,
    type: "mention",
    title: "You were mentioned",
    description: "Vikram mentioned you in QTM-126 · Notification preferences.",
    time: "42 min ago",
    unread: true,
    issueId: "QTM-126",
  },
  {
    id: 4,
    type: "status",
    title: "Issue moved to QA",
    description: "QTM-114 · Connect GitHub commit activity is ready for QA.",
    time: "1 hr ago",
    unread: false,
    issueId: "QTM-114",
  },
  {
    id: 5,
    type: "git",
    title: "New commit linked",
    description: "A new commit was linked to QTM-102 from fix/auth-refresh.",
    time: "2 hrs ago",
    unread: false,
    issueId: "QTM-102",
  },
  {
    id: 6,
    type: "status",
    title: "Issue completed",
    description:
      "QTM-135 · Add validation to create issue form was moved to Done.",
    time: "Yesterday",
    unread: false,
    issueId: "QTM-135",
  },
  {
    id: 7,
    type: "assignment",
    title: "New task assigned",
    description:
      "QTM-132 · Create API token settings has been assigned to Arjun.",
    time: "Yesterday",
    unread: false,
    issueId: "QTM-132",
  },
];

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(initialNotifications);

  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Unread", "Mentions", "Updates"];

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "Unread") {
      return notifications.filter((notification) => notification.unread);
    }

    if (activeFilter === "Mentions") {
      return notifications.filter(
        (notification) => notification.type === "mention",
      );
    }

    if (activeFilter === "Updates") {
      return notifications.filter(
        (notification) =>
          notification.type === "status" || notification.type === "git",
      );
    }

    return notifications;
  }, [activeFilter, notifications]);

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const openNotification = (notification) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id
          ? {
              ...item,
              unread: false,
            }
          : item,
      ),
    );

    if (notification.issueId) {
      navigate(`/issue/${notification.issueId}`);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "assignment":
        return UserRoundPlus;

      case "comment":
        return MessageSquare;

      case "mention":
        return AtSign;

      case "git":
        return GitCommitHorizontal;

      case "status":
        return CheckCheck;

      default:
        return Bell;
    }
  };

  return (
    <MobileShell className="pb-28">
      {/* HEADER */}

      <header className="px-5 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.19em] text-[#9B8E7E]">
              Quantum Flow
            </p>

            <div className="mt-1 flex items-center gap-2">
              <h1 className="text-[26px] font-semibold tracking-[-0.045em] text-[#171512]">
                Inbox
              </h1>

              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B89B72] px-1.5 text-[7px] font-semibold text-[#171512]">
                  {unreadCount}
                </span>
              )}
            </div>

            <p className="mt-1 text-[10px] text-[#8C8173]">
              Stay updated on your workspace.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#171512] text-[19px] text-[#D1B58B]">
            ⬢
          </div>
        </div>
      </header>

      <div className="px-5">
        {/* SUMMARY */}

        <motion.section
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-6 overflow-hidden rounded-[24px] bg-[#171512] p-4 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.16em] text-[#D1B58B]">
                Notification center
              </p>

              <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.03em]">
                {unreadCount === 0
                  ? "You're all caught up"
                  : `${unreadCount} unread updates`}
              </h2>

              <p className="mt-2 max-w-[225px] text-[8px] leading-[13px] text-white/35">
                Assignments, mentions, comments and workflow changes appear
                here.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/[0.07] text-[#D1B58B]">
              <Bell size={17} />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <button
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-[14px] bg-[#D1B58B] py-3 text-[8px] font-semibold text-[#171512] disabled:opacity-40"
            >
              <Check size={12} />
              Mark all as read
            </button>

            <button className="flex h-[38px] w-[38px] items-center justify-center rounded-[13px] bg-white/[0.07] text-white/60">
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </motion.section>

        {/* FILTERS */}

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-4 py-2 text-[8px] font-medium transition ${
                  active
                    ? "bg-[#171512] text-[#FFFCF7]"
                    : "bg-[#F3EEE6] text-[#8C8173]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* SECTION TITLE */}

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[9px] text-[#9B8E7E]">Workspace activity</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em] text-[#171512]">
              {activeFilter}
            </h2>
          </div>

          <span className="rounded-full bg-[#F3EEE6] px-2.5 py-1 text-[8px] font-medium text-[#8C8173]">
            {filteredNotifications.length}
          </span>
        </div>

        {/* NOTIFICATIONS */}

        <div className="mt-3 overflow-hidden rounded-[22px] border border-[#171512]/[0.055] bg-[#FFFCF7]">
          {filteredNotifications.map((notification, index) => {
            const Icon = getNotificationIcon(notification.type);

            return (
              <motion.button
                key={notification.id}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.035,
                }}
                onClick={() => openNotification(notification)}
                className={`relative flex w-full items-start gap-3 p-4 text-left transition active:bg-[#F6F1EA] ${
                  index !== filteredNotifications.length - 1
                    ? "border-b border-[#171512]/[0.05]"
                    : ""
                }`}
              >
                {/* UNREAD DOT */}

                {notification.unread && (
                  <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-[#B89B72]" />
                )}

                {/* ICON */}

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] ${
                    notification.unread
                      ? "bg-[#171512] text-[#D1B58B]"
                      : "bg-[#F3EEE6] text-[#665746]"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.8} />
                </div>

                {/* TEXT */}

                <div className="min-w-0 flex-1 pr-3">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-[10px] ${
                        notification.unread
                          ? "font-semibold text-[#171512]"
                          : "font-medium text-[#665746]"
                      }`}
                    >
                      {notification.title}
                    </h3>
                  </div>

                  <p className="mt-1 text-[8px] leading-[13px] text-[#8C8173]">
                    {notification.description}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[7px] text-[#9B8E7E]">
                      {notification.time}
                    </span>

                    {notification.issueId && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-[#B89B72]" />

                        <span className="text-[7px] font-medium text-[#665746]">
                          {notification.issueId}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <ChevronRight
                  size={14}
                  className="mt-5 shrink-0 text-[#9B8E7E]"
                />
              </motion.button>
            );
          })}
        </div>

        {/* EMPTY STATE */}

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="py-16 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#F3EEE6] text-[#8C8173]">
              <CheckCheck size={20} />
            </div>

            <h3 className="mt-4 text-[12px] font-semibold text-[#171512]">
              Nothing here
            </h3>

            <p className="mt-1 text-[8px] text-[#9B8E7E]">
              No notifications match this filter.
            </p>
          </motion.div>
        )}

        {/* PREFERENCES */}

        <section className="mb-4 mt-7">
          <p className="text-[9px] text-[#9B8E7E]">Preferences</p>

          <button
            onClick={() => navigate("/settings")}
            className="mt-2 flex w-full items-center justify-between rounded-[20px] bg-[#F3EEE6] p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#FFFCF7] text-[#665746]">
                <CircleDot size={15} />
              </div>

              <div>
                <p className="text-[9px] font-semibold text-[#171512]">
                  Notification settings
                </p>

                <p className="mt-[2px] text-[7px] text-[#9B8E7E]">
                  Control assignments, mentions and alerts
                </p>
              </div>
            </div>

            <ChevronRight size={14} className="text-[#8C8173]" />
          </button>
        </section>
      </div>

      <BottomDock />
    </MobileShell>
  );
};

export default Notifications;
