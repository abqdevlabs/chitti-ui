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
import { useRouter } from "next/navigation";
import { Button } from "@app/components/ui/Button";
import { LanguageSwitcher } from "./components/language-changer";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* ---------------- NAVBAR ---------------- */}
      <header className="sticky top-0 z-50 border-b border-outline/20 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-primary">ChitIt</h1>

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
            <a href="policy" className="hover:text-primary">
              Policy
            </a>
            <LanguageSwitcher />
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

      {/* ---------------- landing.hero ---------------- */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-secondary/10" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          {/* Left */}

          <div>
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {t("landing.hero.badge")}
            </span>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight">
              {t("landing.hero.title1")}
              <span className="block text-primary">
                {t("landing.hero.title2")}
              </span>
              {t("landing.hero.title3")}
            </h2>

            <p className="mt-6 max-w-xl text-lg text-on-surface-variant">
              {t("landing.hero.description")}
            </p>

            <div className="mt-8 flex gap-4">
              <Button className="flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-white">
                {t("landing.hero.startFree")}
                <ArrowRight size={18} />
              </Button>

              <Button className="rounded-full border border-outline px-7 py-3">
                {t("landing.hero.bookDemo")}
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-secondary" size={18} />
                {t("landing.hero.secure")}
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-secondary" size={18} />
                {t("landing.hero.cloudBased")}
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-secondary" size={18} />
                {t("landing.hero.multiBranch")}
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="grid gap-5">
            <div className="rounded-3xl bg-surface-container-lowest p-8 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  {t("landing.nav.dashboard")}
                </h3>

                <div className="rounded-full bg-secondary px-4 py-1 text-sm text-white">
                  Live
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card
                  icon={<Wallet className="text-primary" />}
                  title={t("dashboard.todayCollection")}
                  value="₹1,25,000"
                />

                <Card
                  icon={<Users className="text-primary" />}
                  title={t("dashboard.subscribers")}
                  value="845"
                />

                <Card
                  icon={<Bell className="text-primary" />}
                  title={t("dashboard.pending")}
                  value="18"
                />

                <Card
                  icon={<BarChart3 className="text-primary" />}
                  title={t("dashboard.runningChits")}
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
          <h2 className="text-4xl font-bold">
            {t("landing.features.heading")}
          </h2>

          <p className="mt-3 text-on-surface-variant">
            {t("landing.features.description")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<Users />}
            title={t("landing.features.subscriberManagement.title")}
            description={t("landing.features.subscriberManagement.description")}
          />

          <Feature
            icon={<Wallet />}
            title={t("landing.features.collections.title")}
            description={t("landing.features.collections.description")}
          />

          <Feature
            icon={<Bell />}
            title={t("landing.features.notifications.title")}
            description={t("landing.features.notifications.description")}
          />

          <Feature
            icon={<ShieldCheck />}
            title={t("landing.features.security.title")}
            description={t("landing.features.security.description")}
          />

          <Feature
            icon={<BarChart3 />}
            title={t("landing.features.analytics.title")}
            description={t("landing.features.analytics.description")}
          />

          {/* <Feature
            icon={<CheckCircle2 />}
            title="Digital Auctions"
            description="Conduct auctions digitally."
          /> */}
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}

      <section className="bg-surface-container py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
          <Stat value="12K+" label={t("dashboard.subscribers")} />
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

          <p className="mt-4 text-white/80">{t("landing.cta.description")}</p>

          <Button>{t("landing.nav.getStarted")}</Button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}

      <footer className="border-t border-outline/20 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <h2 className="text-xl font-bold text-primary">Chitit</h2>

          <p className="text-sm text-on-surface-variant">
            {t("landing.footer.copyright")}
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
