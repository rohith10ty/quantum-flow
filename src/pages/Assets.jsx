import { motion } from "framer-motion";
import {
  BatteryCharging,
  ChevronRight,
  CircleCheck,
  CircleDot,
  HardDrive,
  Laptop,
  MonitorSmartphone,
  Search,
  Server,
  Smartphone,
  SlidersHorizontal,
  Wifi,
} from "lucide-react";
import { useMemo, useState } from "react";

import BottomDock from "../components/BottomDock";
import MobileShell from "../components/MobileShell";

const Assets = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = ["All", "Laptop", "Phone", "Server"];

  const assets = [
    {
      id: "AST-001",
      name: "MacBook Pro M3",
      type: "Laptop",
      assignedTo: "Rohith Naidu",
      status: "Active",
      health: "Good",
      serial: "QF-MBP-001",
      location: "Bengaluru HQ",
      icon: Laptop,
    },
    {
      id: "AST-002",
      name: "Dell Latitude 7440",
      type: "Laptop",
      assignedTo: "Arjun K",
      status: "Active",
      health: "Good",
      serial: "QF-DL-024",
      location: "Bengaluru HQ",
      icon: Laptop,
    },
    {
      id: "AST-003",
      name: "iPhone 16 Pro",
      type: "Phone",
      assignedTo: "Sanjay K",
      status: "Active",
      health: "Good",
      serial: "QF-IP-118",
      location: "Remote",
      icon: Smartphone,
    },
    {
      id: "AST-004",
      name: "ThinkPad X1 Carbon",
      type: "Laptop",
      assignedTo: "Vikram M",
      status: "Maintenance",
      health: "Attention",
      serial: "QF-LNV-078",
      location: "IT Room",
      icon: Laptop,
    },
    {
      id: "AST-005",
      name: "Production API Server",
      type: "Server",
      assignedTo: "Platform Team",
      status: "Online",
      health: "Good",
      serial: "QF-SRV-001",
      location: "AWS ap-south-1",
      icon: Server,
    },
    {
      id: "AST-006",
      name: "Database Replica",
      type: "Server",
      assignedTo: "Backend Team",
      status: "Online",
      health: "Good",
      serial: "QF-SRV-002",
      location: "AWS ap-south-1",
      icon: HardDrive,
    },
  ];

  const filteredAssets = useMemo(() => {
    const value = search.trim().toLowerCase();

    return assets.filter((asset) => {
      const matchesType = activeFilter === "All" || asset.type === activeFilter;

      const matchesSearch =
        asset.name.toLowerCase().includes(value) ||
        asset.id.toLowerCase().includes(value) ||
        asset.assignedTo.toLowerCase().includes(value) ||
        asset.serial.toLowerCase().includes(value);

      return matchesType && matchesSearch;
    });
  }, [activeFilter, search]);

  const activeCount = assets.filter(
    (asset) => asset.status === "Active" || asset.status === "Online",
  ).length;

  const maintenanceCount = assets.filter(
    (asset) => asset.status === "Maintenance",
  ).length;

  return (
    <MobileShell className="pb-28">
      <header className="px-5 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.19em] text-[#9B8E7E]">
              Quantum Flow
            </p>

            <h1 className="mt-1 text-[26px] font-semibold tracking-[-0.045em] text-[#171512]">
              Assets
            </h1>

            <p className="mt-1 text-[10px] text-[#8C8173]">
              Devices, infrastructure and assigned hardware.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-[#171512] text-[19px] text-[#D1B58B]">
            ⬢
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-[18px] bg-[#F3EEE6] p-3">
            <p className="text-[8px] text-[#9B8E7E]">Total</p>

            <p className="mt-1 text-[20px] font-semibold tracking-[-0.04em] text-[#171512]">
              {assets.length}
            </p>
          </div>

          <div className="rounded-[18px] bg-[#F3EEE6] p-3">
            <p className="text-[8px] text-[#9B8E7E]">Active</p>

            <p className="mt-1 text-[20px] font-semibold tracking-[-0.04em] text-[#171512]">
              {activeCount}
            </p>
          </div>

          <div className="rounded-[18px] bg-[#171512] p-3 text-white">
            <p className="text-[8px] text-[#D1B58B]">Attention</p>

            <p className="mt-1 text-[20px] font-semibold tracking-[-0.04em]">
              {maintenanceCount}
            </p>
          </div>
        </div>
      </header>

      <div className="px-5">
        <motion.section
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-4 rounded-[22px] bg-[#171512] p-4 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[8px] uppercase tracking-[0.15em] text-[#D1B58B]">
                Infrastructure
              </p>

              <h2 className="mt-1 text-[16px] font-semibold">
                Systems overview
              </h2>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-white/[0.07]">
              <MonitorSmartphone size={15} className="text-[#D1B58B]" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-[13px] bg-white/[0.06] p-3">
              <Wifi size={13} className="text-[#D1B58B]" />

              <p className="mt-3 text-[11px] font-semibold">Online</p>

              <p className="mt-[2px] text-[7px] text-white/30">
                Network healthy
              </p>
            </div>

            <div className="rounded-[13px] bg-white/[0.06] p-3">
              <Server size={13} className="text-[#D1B58B]" />

              <p className="mt-3 text-[11px] font-semibold">2</p>

              <p className="mt-[2px] text-[7px] text-white/30">Servers</p>
            </div>

            <div className="rounded-[13px] bg-white/[0.06] p-3">
              <BatteryCharging size={13} className="text-[#D1B58B]" />

              <p className="mt-3 text-[11px] font-semibold">Good</p>

              <p className="mt-[2px] text-[7px] text-white/30">Device health</p>
            </div>
          </div>
        </motion.section>

        <div className="mt-5 flex gap-2">
          <div className="flex h-[47px] flex-1 items-center gap-2.5 rounded-[17px] bg-[#F3EEE6] px-4">
            <Search size={16} className="text-[#8C8173]" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search assets..."
              className="min-w-0 flex-1 bg-transparent text-[10px] outline-none placeholder:text-[#9B8E7E]"
            />
          </div>

          <button className="flex h-[47px] w-[47px] items-center justify-center rounded-[16px] bg-[#171512] text-[#D1B58B]">
            <SlidersHorizontal size={16} />
          </button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-4 py-2 text-[8px] font-medium ${
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

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-[9px] text-[#9B8E7E]">Inventory</p>

            <h2 className="mt-[2px] text-[18px] font-semibold tracking-[-0.03em]">
              Managed assets
            </h2>
          </div>

          <span className="rounded-full bg-[#F3EEE6] px-2.5 py-1 text-[8px] text-[#8C8173]">
            {filteredAssets.length}
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          {filteredAssets.map((asset, index) => {
            const Icon = asset.icon;

            return (
              <motion.button
                key={asset.id}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.04,
                }}
                className="w-full rounded-[22px] border border-[#171512]/[0.055] bg-[#FFFCF7] p-4 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#F3EEE6]">
                    <Icon size={17} className="text-[#665746]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-medium text-[#9B8E7E]">
                        {asset.id}
                      </span>

                      <span className="rounded-full bg-[#EEE5D9] px-2 py-[3px] text-[7px] text-[#665746]">
                        {asset.type}
                      </span>
                    </div>

                    <h3 className="mt-1.5 text-[11px] font-semibold text-[#171512]">
                      {asset.name}
                    </h3>

                    <p className="mt-1 text-[8px] text-[#8C8173]">
                      {asset.assignedTo}
                    </p>
                  </div>

                  <ChevronRight size={14} className="mt-1 text-[#9B8E7E]" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-[14px] bg-[#F3EEE6] p-3">
                    <p className="text-[7px] text-[#9B8E7E]">Status</p>

                    <div className="mt-1 flex items-center gap-1.5">
                      {asset.status === "Maintenance" ? (
                        <CircleDot size={10} className="text-[#B89B72]" />
                      ) : (
                        <CircleCheck size={10} className="text-[#665746]" />
                      )}

                      <p className="text-[8px] font-medium">{asset.status}</p>
                    </div>
                  </div>

                  <div className="rounded-[14px] bg-[#F3EEE6] p-3">
                    <p className="text-[7px] text-[#9B8E7E]">Location</p>

                    <p className="mt-1 truncate text-[8px] font-medium text-[#665746]">
                      {asset.location}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-[#171512]/[0.05] pt-3">
                  <div>
                    <p className="text-[7px] text-[#9B8E7E]">Serial</p>

                    <p className="mt-[2px] text-[8px] font-medium text-[#665746]">
                      {asset.serial}
                    </p>
                  </div>

                  <div className="rounded-full bg-[#EEE5D9] px-2.5 py-1.5">
                    <span className="text-[7px] font-medium text-[#665746]">
                      {asset.health}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {filteredAssets.length === 0 && (
          <div className="py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#F3EEE6]">
              <Search size={19} className="text-[#8C8173]" />
            </div>

            <h3 className="mt-4 text-[12px] font-semibold">No assets found</h3>

            <p className="mt-1 text-[8px] text-[#9B8E7E]">
              Try another search or device type.
            </p>
          </div>
        )}
      </div>

      <BottomDock />
    </MobileShell>
  );
};

export default Assets;
