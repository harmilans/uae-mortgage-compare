import MortgageForm from "@/components/MortgageForm";
import { EIBOR_RATE, EIBOR_LAST_UPDATED } from "@/lib/eibor";
import { BANKS } from "@/lib/banks";

export default function HomePage() {
  const conventionalCount = BANKS.filter((b) => !b.isIslamic).length;
  const islamicCount = BANKS.filter((b) => b.isIslamic).length;
  return (
    <div>
      <div className="py-12 px-4 text-white" style={{ backgroundColor: "#1e3a5f" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">UAE Mortgage Comparison</h1>
          <p className="text-blue-200 text-lg mb-6">
            Compare home loan rates from all {BANKS.length} major UAE banks — side by side, in seconds.
          </p>
          <div className="flex justify-center gap-6 text-sm flex-wrap">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <div className="font-bold text-xl">{BANKS.length}</div>
              <div className="text-blue-200">Banks</div>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <div className="font-bold text-xl">{conventionalCount}</div>
              <div className="text-blue-200">Conventional</div>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <div className="font-bold text-xl">{islamicCount}</div>
              <div className="text-blue-200">Islamic</div>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <div className="font-bold text-xl">{EIBOR_RATE}%</div>
              <div className="text-blue-200">EIBOR (3M)</div>
            </div>
          </div>
          <p className="text-blue-300 text-xs mt-3">EIBOR last updated: {EIBOR_LAST_UPDATED}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <MortgageForm />
      </div>
    </div>
  );
}
