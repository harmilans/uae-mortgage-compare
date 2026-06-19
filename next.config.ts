import type { Bank, BankResult, MortgageInputs } from "./types";
import { getVariableRate } from "./eibor";

function computeEMI(principal: number, annualRatePercent: number, months: number): number {
  const r = annualRatePercent / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function getMaxLtv(bank: Bank, nationality: "expat" | "national", status: "ready" | "off-plan"): number {
  if (status === "off-plan") return 0.50;
  return nationality === "national" ? bank.maxLtvNational : bank.maxLtvExpat;
}

export function calculateResults(inputs: MortgageInputs, banks: Bank[]): BankResult[] {
  const results: BankResult[] = banks.map((bank) => {
    const maxLtv = getMaxLtv(bank, inputs.nationality, inputs.propertyStatus);
    const maxLoanByLtv = inputs.propertyPrice * maxLtv;
    const requestedLoan = inputs.propertyPrice - inputs.downPayment;
    const loanAmount = Math.min(requestedLoan, maxLoanByLtv, bank.maxLoan);
    const months = inputs.tenureYears * 12;

    let eligible = true;
    let ineligibilityReason: string | undefined;

    if (requestedLoan > maxLoanByLtv) {
      eligible = false;
      ineligibilityReason = `Down payment too low — max LTV is ${(maxLtv * 100).toFixed(0)}%`;
    } else if (loanAmount < bank.minLoan) {
      eligible = false;
      ineligibilityReason = `Loan below min (AED ${bank.minLoan.toLocaleString()})`;
    } else if (inputs.monthlyIncome < bank.minMonthlySalaryAED) {
      eligible = false;
      ineligibilityReason = `Income below min (AED ${bank.minMonthlySalaryAED.toLocaleString()}/mo)`;
    } else if (inputs.tenureYears > bank.maxTenureYears) {
      eligible = false;
      ineligibilityReason = `Max tenure is ${bank.maxTenureYears} years`;
    }

    const effectiveRate =
      inputs.rateType === "variable"
        ? getVariableRate(bank.variableSpread)
        : bank.fixedRates[`yr${inputs.fixedPeriodYears}` as "yr1" | "yr3" | "yr5"];

    const monthlyEMI = computeEMI(loanAmount, effectiveRate, months);
    const totalPaid = monthlyEMI * months;
    const totalInterest = totalPaid - loanAmount;
    const processingFee = loanAmount * (bank.processingFeePercent / 100);
    const totalCost = totalPaid + processingFee;

    const availableForEMI = (inputs.monthlyIncome - inputs.existingLiabilities) * 0.50;
    if (eligible && monthlyEMI > availableForEMI) {
      eligible = false;
      ineligibilityReason = `EMI exceeds 50% DBR limit`;
    }

    return {
      bank,
      loanAmount,
      effectiveRate,
      monthlyEMI,
      totalInterest,
      totalCost,
      processingFee,
      eligible,
      ineligibilityReason,
      badges: [],
    };
  });

  const eligible = results.filter((r) => r.eligible);
  if (eligible.length > 0) {
    const lowestEMI = eligible.reduce((a, b) => (a.monthlyEMI < b.monthlyEMI ? a : b));
    lowestEMI.badges.push("Lowest EMI");

    const lowestCost = eligible.reduce((a, b) => (a.totalCost < b.totalCost ? a : b));
    if (lowestCost.bank.id !== lowestEMI.bank.id) lowestCost.badges.push("Lowest Total Cost");
    else lowestEMI.badges.push("Lowest Total Cost");

    const lowestFee = eligible.reduce((a, b) => (a.processingFee < b.processingFee ? a : b));
    lowestFee.badges.push("Lowest Fee");
  }

  return results.sort((a, b) => {
    if (a.eligible && !b.eligible) return -1;
    if (!a.eligible && b.eligible) return 1;
    return a.monthlyEMI - b.monthlyEMI;
  });
}
