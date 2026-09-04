"use client";

import {
  CreditCard,
  LayoutDashboard,
  ReceiptText,
  UserRound,
} from "lucide-react";
import Link from "next/link";

interface MemberSidebarProps {
  currentPath: string;
  onSelect: (currentPath: string) => void;
}

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    route: "/member/dashboard",
  },
  { id: "chits", label: "My Chits", icon: ReceiptText, route: "/member/chits" },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    route: "/member/payments",
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserRound,
    route: "/member/profile",
  },
];

export function MemberSidebar({ currentPath, onSelect }: MemberSidebarProps) {
  return (
    <aside className="flex h-[calc(100vh-4rem)] w-full flex-col border-r border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="px-2 pb-6 pt-2">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-blue-700">
          ChitGold
          <span className="-mt-1 block text-xl font-medium text-slate-800">
            Member Portal
          </span>
        </h2>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">
          Your chit account
        </p>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.id;

          return (
            <Link
              key={item.id}
              href={item.route}
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3.5 rounded-lg px-4 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/10"
                  : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
