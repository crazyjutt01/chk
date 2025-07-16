import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { SupportChatbox } from "@/components/support-chatbox";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lifeswap",
  description: "Claim your maximum refund",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={inter.className}>
        {children}
        <SupportChatbox />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
