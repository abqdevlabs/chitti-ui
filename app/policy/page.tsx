"use client";
import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Scale,
  Lock,
  AlertCircle,
  Search,
  CheckCircle2,
  Building2,
  Mail,
  ChevronRight,
} from "lucide-react";

type PolicyTab = "privacy" | "terms" | "conditions";

export const ChititLegalPolicy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PolicyTab>("privacy");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const lastUpdated = "July 22, 2026";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header Banner */}
      <header className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-sm font-medium border border-indigo-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Chitit Legal & Regulatory Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Legal Policies & Governance
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Operating in full compliance with the Chit Funds Act, 1982 (Amended
            2019) and Reserve Bank of India (RBI) digital financial guidelines.
          </p>
          <div className="text-xs text-slate-400">
            Last Updated:{" "}
            <span className="text-slate-200 font-semibold">{lastUpdated}</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Navigation Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "privacy"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab("terms")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "terms"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={() => setActiveTab("conditions")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "conditions"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Chit Terms & Conditions</span>
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search policy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Nav / Table of Contents Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="bg-white p-5 rounded-xl border border-slate-200 sticky top-6 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quick Navigation
              </h3>
              <nav className="space-y-2 text-sm">
                {activeTab === "privacy" && (
                  <>
                    <a
                      href="#privacy-1"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      1. Data We Collect
                    </a>
                    <a
                      href="#privacy-2"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      2. Financial & KYC Data
                    </a>
                    <a
                      href="#privacy-3"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      3. How Data is Shared
                    </a>
                    <a
                      href="#privacy-4"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      4. Security & Encryption
                    </a>
                  </>
                )}
                {activeTab === "terms" && (
                  <>
                    <a
                      href="#terms-1"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      1. Platform Usage
                    </a>
                    <a
                      href="#terms-2"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      2. User Eligibility
                    </a>
                    <a
                      href="#terms-3"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      3. Digital Signatures
                    </a>
                    <a
                      href="#terms-4"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      4. Limitation of Liability
                    </a>
                  </>
                )}
                {activeTab === "conditions" && (
                  <>
                    <a
                      href="#cond-1"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      1. Chit Group Formation
                    </a>
                    <a
                      href="#cond-2"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      2. Bidding & Foreman Fee
                    </a>
                    <a
                      href="#cond-3"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      3. Defaults & Penalties
                    </a>
                    <a
                      href="#cond-4"
                      className="block text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                      4. Guarantor Requirements
                    </a>
                  </>
                )}
              </nav>
            </div>
          </aside>

          {/* Main Legal Body */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            {/* PRIVACY POLICY CONTENT */}
            {activeTab === "privacy" && (
              <div className="space-y-8 text-slate-700 leading-relaxed">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Privacy Policy
                  </h2>
                  <p className="text-slate-500 text-sm">
                    At Chitit, we are committed to maintaining the
                    confidentiality, integrity, and security of your personal
                    and financial information.
                  </p>
                </div>

                <section id="privacy-1" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    1. Information We Collect
                  </h3>
                  <p>
                    To facilitate registered chit fund operations, Chitit
                    collects essential user identification and financial
                    records, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-slate-600">
                    <li>
                      <strong>Personal Identity Data:</strong> Name, Permanent
                      Account Number (PAN), Aadhaar, phone number, and physical
                      address.
                    </li>
                    <li>
                      <strong>Financial Details:</strong> Bank account numbers,
                      IFSC codes, income proofs, and credit assessment records.
                    </li>
                    <li>
                      <strong>Platform Usage Data:</strong> IP address, device
                      telemetry, browser information, and transaction activity
                      logs.
                    </li>
                  </ul>
                </section>

                <section id="privacy-2" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    2. KYC and Verification Data Processing
                  </h3>
                  <p>
                    In accordance with regulatory mandates from the Registrar of
                    Chits and Prevention of Money Laundering Act (PMLA) rules,
                    Chitit verifies user identity via central KYC repositories
                    or UIDAI e-KYC. Your identity data is strictly used for
                    eligibility checks, ticket allocation, and preventing fraud.
                  </p>
                </section>

                <section id="privacy-3" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    3. Disclosure of Information
                  </h3>
                  <p>
                    Chitit does not sell or rent your personal data to third
                    parties. Data sharing occurs solely under the following
                    conditions:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-slate-600">
                    <li>
                      <strong>Regulatory Authorities:</strong> Sharing required
                      filings with the Registrar of Chits or law enforcement
                      agencies upon lawful notice.
                    </li>
                    <li>
                      <strong>Banking Partners:</strong> Disclosing details to
                      approved escrow banks to process online auctions, payouts,
                      and monthly subscriptions.
                    </li>
                  </ul>
                </section>

                <section id="privacy-4" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    4. Data Storage and Security
                  </h3>
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-3">
                    <Lock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-indigo-950">
                      All data in transit and at rest is protected using
                      industry-standard 256-bit AES encryption. Financial
                      records are retained for a minimum of 5 years following
                      chit termination, as required by Indian financial
                      compliance laws.
                    </p>
                  </div>
                </section>
              </div>
            )}

            {/* TERMS OF SERVICE CONTENT */}
            {activeTab === "terms" && (
              <div className="space-y-8 text-slate-700 leading-relaxed">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Terms of Service
                  </h2>
                  <p className="text-slate-500 text-sm">
                    These Terms govern your access to and use of the Chitit web
                    portal, mobile applications, and digitized chit management
                    tools.
                  </p>
                </div>

                <section id="terms-1" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    1. Platform Usage & Scope
                  </h3>
                  <p>
                    Chitit provides technological infrastructure enabling
                    subscribers, foremen, and authorized administrators to
                    digitize chit group management, conduct online auctions,
                    manage ledger entries, and track dividend distributions.
                  </p>
                </section>

                <section id="terms-2" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    2. User Eligibility & Account Responsibilities
                  </h3>
                  <p>By registering an account on Chitit, you affirm that:</p>
                  <ul className="list-disc pl-6 space-y-1 text-slate-600">
                    <li>
                      You are at least 18 years of age and legally competent to
                      enter into binding contracts.
                    </li>
                    <li>
                      You are providing truthful, current, and verified personal
                      documentation.
                    </li>
                    <li>
                      You are responsible for protecting your account
                      credentials and multi-factor authentication (MFA) devices.
                    </li>
                  </ul>
                </section>

                <section id="terms-3" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    3. Digital Signatures & Chit Agreements
                  </h3>
                  <p>
                    Execution of digital chit agreements, bids, and consent
                    forms via OTP or e-Sign on Chitit holds equivalent legal
                    standing to physical signatures under the Information
                    Technology Act, 2000.
                  </p>
                </section>

                <section id="terms-4" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    4. Limitation of Liability
                  </h3>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900">
                      Chitit functions as a tech platform facilitating
                      compliance and operations. Chitit is not liable for
                      subscriber defaults or delays caused by third-party
                      payment gateways, bank clearing networks, or force majeure
                      events.
                    </p>
                  </div>
                </section>
              </div>
            )}

            {/* CHIT TERMS & CONDITIONS CONTENT */}
            {activeTab === "conditions" && (
              <div className="space-y-8 text-slate-700 leading-relaxed">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Chit Group Terms & Conditions
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Specific rules governing ticket subscriptions, auctions,
                    foreman commissions, and prize disbursements under the Chit
                    Funds Act, 1982.
                  </p>
                </div>

                <section id="cond-1" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    1. Chit Formation & Registration
                  </h3>
                  <p>
                    Every chit scheme hosted on Chitit operates only after
                    obtaining prior sanction and registration approval from the
                    appropriate State Registrar of Chits. The aggregate chit
                    value and maximum duration comply with statutory caps.
                  </p>
                </section>

                <section id="cond-2" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    2. Auction Procedures & Dividend Distribution
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-slate-600">
                    <li>
                      <strong>Auction Schedule:</strong> Auctions are conducted
                      digitally at fixed monthly intervals as defined in the
                      specific Chit Agreement.
                    </li>
                    <li>
                      <strong>Foreman Commission:</strong> The foreman
                      commission is fixed up to 7% of the total chit amount as
                      allowed by law.
                    </li>
                    <li>
                      <strong>Maximum Discount:</strong> Bidding discounts are
                      capped at 30% of the total chit value. Remaining discount
                      proceeds after commission are distributed equally as
                      dividends among all non-defaulting subscribers.
                    </li>
                  </ul>
                </section>

                <section id="cond-3" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    3. Prized Subscribers & Security Submission
                  </h3>
                  <p>
                    A prized subscriber (winning bidder) must provide sufficient
                    security (e.g., bank guarantee, immovable property mortgage,
                    or salary guarantees) acceptable to the Foreman for future
                    unpaid installments prior to prize money disbursement.
                  </p>
                </section>

                <section id="cond-4" className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                    4. Defaulting Subscribers & Substitution
                  </h3>
                  <p>
                    Non-payment of monthly subscriptions by the designated due
                    date attracts late fees. Continued default after formal
                    written notice permits the foreman to remove the defaulting
                    subscriber, substitute a replacement subscriber, or recover
                    dues through statutory dispute resolution channels outlined
                    in the Chit Funds Act.
                  </p>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChititLegalPolicy;
