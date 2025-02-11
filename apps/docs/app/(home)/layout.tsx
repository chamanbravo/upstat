import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { Metadata, Viewport } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Upstat | simple & easy status monitoring",
  description:
    "Upstat is a simple, open-source, and self-hosted status monitoring tool with uptime tracking, latency charts, notifications, and more.",
  keywords: [
    "monitor uptime",
    "status monitoring",
    "latency chart",
    "discord notifications",
    "status pages",
    "ping chart",
    "SSL certificate monitoring",
    "downtime alerts",
    "open-source monitoring",
  ],
  authors: [{ name: "Chaman Bravo" }, { name: "callbackcat" }],
  openGraph: {
    type: "website",
    title: "Upstat | Simple & Easy Status Monitoring",
    description:
      "Upstat is a simple, open-source, and self-hosted status monitoring tool with uptime tracking, latency charts, notifications, and more.",
    images: "/upstat.webp",
    locale: "en_US",
    url: new URL(BASE_URL),
  },
  twitter: {
    card: "summary_large_image",
    title: "Upstat | Simple & Easy Status Monitoring",
    description:
      "Upstat is a simple, open-source, and self-hosted status monitoring tool with uptime tracking, latency charts, notifications, and more.",
  },
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
