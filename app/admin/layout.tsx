"use client";

import React, { useState } from "react";
import { TopBar } from "@app/admin/components/TopBar";
import { SideNavbar } from "@app/admin/components/SideBar";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSideBar, setSelectedSideBar] = useState("dashboard");

  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-100/40 font-sans">
      {/* Top Header - Sticky across admin pages */}

      <div className="flex flex-1">
        {/* Mobile Sidebar Backdrop Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Responsive Drawer Wrap */}
        <div
          className={`
  fixed bottom-0 top-16 left-0 z-40 w-64
  transition-transform duration-300 ease-in-out
  lg:sticky lg:translate-x-0
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
`}
        >
          <SideNavbar
            currentPath={selectedSideBar}
            onSelect={(c) => {
              setSelectedSideBar(c);
              console.log(c);
            }}
          />
        </div>

        {/* Main Workspace Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
