"use client";

import { useAuth } from "@/context/authContext";

export default function MemberDashboard() {
  const { user } = useAuth();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-700">Member dashboard</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Welcome back{user?.email ? `, ${user.email}` : ""}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          View your assigned chits, payment history, and account details.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Assigned chits</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">--</p>
        </div>
        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Upcoming payment</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">--</p>
        </div>
        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Payment history</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">View</p>
        </div>
      </div>
    </section>
  );
}
