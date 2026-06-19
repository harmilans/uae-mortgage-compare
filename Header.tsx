import { BANKS } from "@/lib/banks";
import { calculateResults } from "@/lib/calculator";
import ComparisonTable from "@/components/ComparisonTable";
import type { MortgageInputs } from "@/lib/types";
import Link from "next/link";
import { EIBOR_RATE, EIBOR_LAST_UPDATED } from "@/lib/eibor";

interface PageProps {
  searchParams: Record<string, string>;
}

export default function ResultsPage({ searchParams }: PageProps) {
  const inputs: MortgageInputs = {
    propertyPrice: Number(searchParams.propertyPrice) || 1500000,
    downPayment: Number(searchParams.downPayment) || 300000,
    emirate: searchParams.emirate || "Dubai",
    propertyType: (searchParams.propertyType as MortgageInputs["propertyType"]) || "apartment",
    propertyStatus: (searchParams.propertyStatus as MortgageInputs["propertyStatus"]) || "ready",
    nationality: (searchParams.nationality as MortgageInputs["nationality"]) || "expat",
    employmentType: (searchParams.employmentType as MortgageInputs["employmentType"]) || "salaried",
    monthlyIncome: Number(searchParams.monthlyIncome) || 25000,
    existingLiabilities: Number(searchParams.existingLiabilities) || 0,
    rateType: (searchParams.rateType as MortgageInputs["rateType"]) || "fixed",
    fixedPeriodYears: (Number(searchParams.fixedPeriodYears) as 1 | 3 | 5) || 3,
    tenureYears: Number(searchParams.tenureYears) || 20,
  };

  const loanAmount = inputs.propertyPrice - inputs.downPayment;
  const results = calculateResults(inputs, BANKS);
  const eligibleCount = results.filter((r) => r.eligible).length;
  const fmt = (n: number) => new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(n);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>Comparison Results</h2>
          <p className="text-gray-600 text-sm mt-1">
            Loan: AED {fmt(loanAmount)} · {inputs.tenureYears} years ·{" "}
            {inputs.rateType === "fixed" ? `Fixed ${inputs.fixedPeriodYears}yr` : "Variable (EIBOR+)"} ·{" "}
            {inputs.emirate} · {inputs.nationality === "national" ? "UAE National" : "Expat"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">EIBOR: {EIBOR_RATE}% · as of {EIBOR_LAST_UPDATED}</p>
        </div>
        <div className="flex gap-3 text-sm flex-wrap">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
            {eligibleCount} Eligible Banks
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {BANKS.length - eligibleCount} Not Eligible
          </span>
          <Link href="/" className="text-white px-4 py-1 rounded-full font-medium" style={{ backgroundColor: "#1e3a5f" }}>
            ← Modify
          </Link>
        </div>
      </div>
      <ComparisonTable results={results} />
      <p className="text-xs text-gray-400 mt-6 text-center">
        Rates are indicative. Verify all figures directly with the bank.
      </p>
    </div>
  );
}
