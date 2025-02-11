import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Upstat",
  description: "A simple open-source, self-hosted status monitoring tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("upstat.theme");

  return (
    <html lang="en" className={theme?.value || "dark"}>
      <body className={inter.className}>
        <>
          <Toaster />
          {children}
        </>
      </body>
    </html>
  );
}
