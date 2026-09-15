import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { AppKitProvider } from "@/components/AppKitProvider";
import { WalletProvider } from "@/lib/wallet-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "TruthStake — Protocol Dispute & Interpretation Arena",
  description:
    "Stake on truth. Challenge ambiguous protocol claims with evidence. Resolved by GenLayer intelligent validator consensus.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppKitProvider>
          <WalletProvider>
            <MobileHeader />
            <Sidebar />
            <main className="md:ml-64 pt-16 md:pt-0 min-h-screen">{children}</main>
          </WalletProvider>
        </AppKitProvider>
      </body>
    </html>
  );
}
