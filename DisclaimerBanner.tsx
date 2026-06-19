"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MortgageInputs } from "@/lib/types";

const EMIRATES = ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

export default function MortgageForm() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<MortgageInputs>>({
    propertyType: "apartment",
    propertyStatus: "ready",
    nationality: "expat",
    employmentType: "salaried",
    rateType: "fixed",
    fixedPeriodYears: 3,
    tenureYears: 20,
    emirate: "Dubai",
    existingLiabilities: 0,
    downPayment: 0,
  });

  const set = (field: keyof MortgageInputs, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(
      Object.entries(form).map(([k, v]) => [k, String(v)])
    );
    router.push(`/results?${params.toString()}`);
  };

  const ltvHint =
    form.propertyStatus === "off-plan"
      ? "Max LTV 50% for off-plan"
      : form.nationality === "national"
      ? "Max LTV 85% for UAE nationals"
      : "Max LTV 80% for expats";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
      <section>
        <h3 className="font-semibold text-lg mb-4" style={{ color: "#1e3a5f" }}>
          Property Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Price (AED)</label>
            <input
              type="number"
              required
              min={300000}
              placeholder="e.g. 1500000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => set("propertyPrice", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (AED)</label>
            <input
              type="number"
              required
              min={0}
              placeholder="e.g. 300000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => set("downPayment", Number(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-1">{ltvHint}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emirate</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={form.emirate}
              onChange={(e) => set("emirate", e.target.value)}
            >
              {EMIRATES.map((em) => <option key={em}>{em}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={form.propertyType}
              onChange={(e) => set("propertyType", e.target.value)}
            >
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={form.propertyStatus}
              onChange={(e) => set("propertyStatus", e.target.value)}
            >
              <option value="ready">Ready</option>
              <option value="off-plan">Off-Plan</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-4" style={{ color: "#1e3a5f" }}>Your Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={form.nationality}
              onChange={(e) => set("nationality", e.target.value)}
            >
              <option value="expat">Expat</option>
              <option value="national">UAE National</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={form.employmentType}
              onChange={(e) => set("employmentType", e.target.value)}
            >
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-Employed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (AED)</label>
            <input
              type="number"
              required
              min={5000}
              placeholder="e.g. 25000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => set("monthlyIncome", Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Existing Monthly Liabilities (AED)</label>
            <input
              type="number"
              min={0}
              defaultValue={0}
              placeholder="e.g. 5000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => set("existingLiabilities", Number(e.target.value))}
            />
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-4" style={{ color: "#1e3a5f" }}>Loan Preferences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={form.rateType}
              onChange={(e) => set("rateType", e.target.value)}
            >
              <option value="fixed">Fixed</option>
              <option value="variable">Variable (EIBOR+)</option>
            </select>
          </div>
          {form.rateType === "fixed" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Period</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={form.fixedPeriodYears}
                onChange={(e) => set("fixedPeriodYears", Number(e.target.value))}
              >
                <option value={1}>1 Year</option>
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Tenure</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={form.tenureYears}
              onChange={(e) => set("tenureYears", Number(e.target.value))}
            >
              {[5, 10, 15, 20, 25].map((y) => (
                <option key={y} value={y}>{y} Years</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <button
        type="submit"
        className="w-full py-3 rounded-xl text-white font-semibold text-lg transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#1e3a5f" }}
      >
        Compare All Banks →
      </button>
    </form>
  );
}
