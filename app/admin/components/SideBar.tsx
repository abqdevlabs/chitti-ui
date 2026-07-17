"use client";

import {
  LayoutDashboard,
  Gavel,
  Users,
  CreditCard,
  PiggyBank,
  BarChart3,
  Settings,
  HelpCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";

interface SideNavbarProps {
  currentPath: string;
  onSelect: (currentPath: string) => void;
}

export function SideNavbar({ currentPath, onSelect }: SideNavbarProps) {
  // Clean structure for nav items instead of repeating massive chunks of HTML
  const mainNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      route: "/admin/dashboard",
    },
    { id: "chits", label: "Chits", icon: Gavel, route: "/admin/chits" },
    { id: "members", label: "Members", icon: Users, route: "/admin/members" },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      route: "/admin/payments",
    },
  ];

  const footerNavItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    //
    <aside className="flex h-[calc(100vh-4rem)] w-full flex-col border-r border-slate-200 bg-slate-50 p-4 shadow-sm">
      {/* Brand Header */}
      <div className="px-2 pb-6 pt-2">
        <h2 className="text-2xl font-bold tracking-tight text-blue-700 font-sans">
          Foreman
          <span className="block text-xl font-medium text-slate-800 -mt-1">
            Portal
          </span>
        </h2>
        <p className="text-[11px] font-medium tracking-wider text-slate-400 uppercase mt-1">
          Trust & Transparency
        </p>
      </div>

      {/* Main Navigation links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.id;

          return (
            <Link
              key={item.id}
              href={item.route}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
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

      {/* Footer Controls & Secondary Navigation */}
      <div className="pt-4 border-t border-slate-200/80 space-y-3">
        {/* Action Button */}

        {/* Support & Settings Links */}
        <div className="space-y-1">
          {footerNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.id;

            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 text-slate-500" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
