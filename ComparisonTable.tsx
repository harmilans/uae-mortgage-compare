import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import DisclaimerBanner from "@/components/DisclaimerBanner";

export const metadata: Metadata = {
  title: "UAE Mortgage Compare — Compare All 20 UAE Banks",
  description: "Compare home loan rates from all 20 major UAE banks including ADCB, Emirates NBD, FAB, ADIB, DIB and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Header />
        <main>{children}</main>
        <DisclaimerBanner />
        <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6 mt-12">
          <p>© {new Date().getFullYear()} UAE Mortgage Compare. For informational purposes only.</p>
          <p className="mt-1">Not affiliated with any bank. Always verify rates directly with the bank.</p>
        </footer>
      </body>
    </html>
  );
}
