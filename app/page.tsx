"use client";
import {
  ArrowRight,
  CheckCircle2,
  Bell,
  Users,
  Wallet,
  BarChart3,
  ShieldCheck,
  Menu,
} from "lucide-react";
import { Button } from "./components/ui/Button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* ---------------- NAVBAR ---------------- */}
      <header className="sticky top-0 z-50 border-b border-outline/20 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-primary">
            Chit<span className="text-secondary">Flow</span>
          </h1>

          <nav className="hidden gap-8 md:flex">
            <a href="#features" className="hover:text-primary">
              Features
            </a>
            <a href="#dashboard" className="hover:text-primary">
              Dashboard
            </a>
            <a href="#pricing" className="hover:text-primary">
              Pricing
            </a>
            <a href="#contact" className="hover:text-primary">
              Contact
            </a>
          </nav>

          <div className="hidden gap-3 md:flex">
            <Button
              className="rounded-full border border-outline px-5 py-2"
              onClick={() => router.push("login")}
            >
              Login
            </Button>

            <Button className="rounded-full bg-primary px-5 py-2 font-semibold text-on-primary transition hover:scale-105">
              Get Started
            </Button>
          </div>

          <Menu className="md:hidden" />
        </div>
      </header>

      {/* ---------------- HERO ---------------- */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-secondary/10" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          {/* Left */}

          <div>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Modern Chit Fund Platform
            </span>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight">
              Manage Your
              <span className="block text-primary">Chit Fund Business</span>
              Effortlessly
            </h2>

            <p className="mt-6 max-w-xl text-lg text-on-surface-variant">
              Manage subscribers, auctions, collections, branches, reports,
              payments and notifications from one beautiful dashboard.
            </p>

            <div className="mt-8 flex gap-4">
              <Button className="flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-white">
                Start Free
                <ArrowRight size={18} />
              </Button>

              <Button className="rounded-full border border-outline px-7 py-3">
                Book Demo
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-secondary" size={18} />
                Secure
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-secondary" size={18} />
                Cloud Based
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-secondary" size={18} />
                Multi Branch
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="grid gap-5">
            <div className="rounded-3xl bg-surface-container-lowest p-8 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Dashboard</h3>

                <div className="rounded-full bg-secondary px-4 py-1 text-sm text-white">
                  Live
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card
                  icon={<Wallet className="text-primary" />}
                  title="Today's Collection"
                  value="₹1,25,000"
                />

                <Card
                  icon={<Users className="text-primary" />}
                  title="Subscribers"
                  value="845"
                />

                <Card
                  icon={<Bell className="text-primary" />}
                  title="Pending"
                  value="18"
                />

                <Card
                  icon={<BarChart3 className="text-primary" />}
                  title="Running Chits"
                  value="32"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Everything You Need</h2>

          <p className="mt-3 text-on-surface-variant">
            Powerful tools to automate your chit fund business.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<Users />}
            title="Subscriber Management"
            description="Manage members with complete payment history."
          />

          <Feature
            icon={<Wallet />}
            title="Collections"
            description="Track installment collections in real time."
          />

          <Feature
            icon={<Bell />}
            title="Notifications"
            description="Automatic SMS & WhatsApp reminders."
          />

          <Feature
            icon={<ShieldCheck />}
            title="Secure"
            description="Role based access and encrypted data."
          />

          <Feature
            icon={<BarChart3 />}
            title="Analytics"
            description="Business insights with beautiful charts."
          />

          <Feature
            icon={<CheckCircle2 />}
            title="Digital Auctions"
            description="Conduct auctions digitally."
          />
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}

      <section className="bg-surface-container py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
          <Stat value="12K+" label="Subscribers" />
          <Stat value="₹120Cr+" label="Transactions" />
          <Stat value="99.9%" label="Uptime" />
          <Stat value="250+" label="Organizations" />
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-4xl bg-primary p-14 text-center text-white">
          <h2 className="text-4xl font-bold">
            Ready to Modernize Your Chit Fund?
          </h2>

          <p className="mt-4 text-white/80">
            Start managing collections, auctions and members with confidence.
          </p>

          <Button>Get Started</Button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}

      <footer className="border-t border-outline/20 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <h2 className="text-xl font-bold text-primary">ChitFlow</h2>

          <p className="text-sm text-on-surface-variant">
            © 2026 ChitFlow. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <div>{icon}</div>

      <p className="mt-3 text-sm text-on-surface-variant">{title}</p>

      <h3 className="mt-2 text-2xl font-bold">{value}</h3>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-outline/20 bg-surface-container-lowest p-8 transition hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-on-surface-variant">{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold text-primary">{value}</h2>

      <p className="mt-2 text-on-surface-variant">{label}</p>
    </div>
  );
}
