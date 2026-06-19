"use client";

import type { BankResult } from "@/lib/types";

const fmt = (n: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(n);

export default function ComparisonTable({ results }: { results: BankResult[] }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-white text-left" style={{ backgroundColor: "#1e3a5f" }}>
            <th className="px-4 py-3">Bank</th>
            <th className="px-4 py-3">Rate</th>
            <th className="px-4 py-3">Monthly EMI</th>
            <th className="px-4 py-3">Total Interest</th>
            <th className="px-4 py-3">Processing Fee</th>
            <th className="px-4 py-3">Total Cost</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.bank.id}
              className={`border-b ${r.eligible ? "bg-white hover:bg-blue-50" : "bg-gray-50 opacity-60"} transition-colors`}>
              <td className="px-4 py-3">
                <div className="font-semibold text-gray-900">{r.bank.shortName}</div>
                <div className="text-xs text-gray-500">{r.bank.isIslamic ? "Islamic" : "Conventional"}</div>
                {r.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {r.badges.map((b) => (
                      <span key={b} className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: "#c9a84c", color: "#1e3a5f" }}>{b}</span>
                    ))}
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-semibold text-blue-800">{r.effectiveRate.toFixed(2)}%</td>
              <td className="px-4 py-3 font-bold text-gray-900">AED {fmt(r.monthlyEMI)}</td>
              <td className="px-4 py-3 text-gray-700">AED {fmt(r.totalInterest)}</td>
              <td className="px-4 py-3 text-gray-700">AED {fmt(r.processingFee)}</td>
              <td className="px-4 py-3 text-gray-700">AED {fmt(r.totalCost)}</td>
              <td className="px-4 py-3">
                {r.eligible
                  ? <span className="text-green-700 font-medium text-xs bg-green-100 px-2 py-1 rounded-full">Eligible</span>
                  : <span className="text-red-700 text-xs bg-red-50 px-2 py-1 rounded-full">{r.ineligibilityReason}</span>}
              </td>
              <td className="px-4 py-3">
                {r.eligible && (
                  <a href={r.bank.applyUrl} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-medium px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#1e3a5f" }}>
                    Apply →
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
