"use client";

import { Menu, Search, Bell, Settings } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

interface TopBarProps {
  user?: {
    name: string;
    avatar?: string;
  };
  onMenuClick?: () => void;
}

export function TopBar({ user, onMenuClick }: TopBarProps) {
  const { user: authenticatedUser } = useAuth();
  const displayName = user?.name ?? authenticatedUser?.email ?? "User";
  const roleLabel = authenticatedUser?.role === "admin" ? "Admin" : "Member";

  // Extract initials for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-outline-variant/40 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Section: Menu Toggle & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Button - Hidden on Desktop (lg) */}
          <button
            onClick={onMenuClick}
            aria-label="Toggle navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-surface-container lg:hidden"
          >
            <Menu className="h-5 w-5 text-on-surface" />
          </button>

          {/* Logo */}
          <h1 className="text-xl font-bold tracking-tight text-primary">
            ChitGold
          </h1>
        </div>

        {/* Center Section: Desktop Search - Hidden on Mobile */}
        <div className="hidden flex-1 justify-center px-4 md:flex max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search chits, members..."
              className="h-10 w-full rounded-full bg-surface-container pl-11 pr-4 text-sm text-on-surface outline-none placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Search Icon Button - Only visible on small screens */}
          <button
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-container md:hidden"
          >
            <Search className="h-5 w-5 text-on-surface" />
          </button>

          {/* Notifications Button */}
          <button
            aria-label="View notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-container"
          >
            <Bell className="h-5 w-5 text-on-surface" />
            {/* Notification Badge */}
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-error ring-2 ring-surface" />
          </button>

          {/* Settings Button - Hidden on ultra mobile, breaks out at 'sm' breakpoint */}
          <button
            aria-label="Settings"
            className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-container sm:flex"
          >
            <Settings className="h-5 w-5 text-on-surface" />
          </button>

          {/* Profile Action Menu */}
          <button className="flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface-container-low p-1 transition-colors hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20">
            {/* Dynamic Avatar Wrapper */}
            <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary items-center justify-center text-xs font-semibold">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              ) : (
                <span>{getInitials(displayName)}</span>
              )}
            </div>

            {/* User Metadata - Hidden on mobile, pops in at 'md' layout */}
            <div className="hidden pr-2 text-left md:block">
              <p className="max-w-30 truncate text-xs font-semibold text-on-surface leading-tight">
                {displayName}
              </p>
              <p className="text-[10px] text-on-surface-variant leading-none mt-0.5">
                {roleLabel}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
