import { BANKS } from "@/lib/banks";
import { EIBOR_RATE, EIBOR_LAST_UPDATED } from "@/lib/eibor";

export default function AdminRatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>Rate Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">
            Current EIBOR: <strong>{EIBOR_RATE}%</strong> — last updated {EIBOR_LAST_UPDATED}
          </p>
        </div>
        <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
          MVP — edit lib/banks.ts to update rates
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white text-left" style={{ backgroundColor: "#1e3a5f" }}>
              <th className="px-4 py-3">Bank</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Fixed 1yr</th>
              <th className="px-4 py-3">Fixed 3yr</th>
              <th className="px-4 py-3">Fixed 5yr</th>
              <th className="px-4 py-3">Variable Spread</th>
              <th className="px-4 py-3">Effective Variable</th>
              <th className="px-4 py-3">Processing Fee</th>
              <th className="px-4 py-3">Min Salary</th>
              <th className="px-4 py-3">Max LTV (Expat)</th>
              <th className="px-4 py-3">Max Tenure</th>
            </tr>
          </thead>
          <tbody>
            {BANKS.map((bank, i) => (
              <tr key={bank.id} className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="px-4 py-3">
                  <div className="font-semibold">{bank.shortName}</div>
                  <div className="text-xs text-gray-400">{bank.name}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${bank.isIslamic ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>
                    {bank.isIslamic ? "Islamic" : "Conventional"}
                  </span>
                </td>
                <td className="px-4 py-3">{bank.fixedRates.yr1}%</td>
                <td className="px-4 py-3">{bank.fixedRates.yr3}%</td>
                <td className="px-4 py-3">{bank.fixedRates.yr5}%</td>
                <td className="px-4 py-3">+{bank.variableSpread}%</td>
                <td className="px-4 py-3 font-medium text-blue-800">{(EIBOR_RATE + bank.variableSpread).toFixed(2)}%</td>
                <td className="px-4 py-3">{bank.processingFeePercent}%</td>
                <td className="px-4 py-3">AED {bank.minMonthlySalaryAED.toLocaleString()}</td>
                <td className="px-4 py-3">{(bank.maxLtvExpat * 100).toFixed(0)}%</td>
                <td className="px-4 py-3">{bank.maxTenureYears} yrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
