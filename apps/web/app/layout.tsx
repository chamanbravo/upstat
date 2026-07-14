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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const themeCookie = (await cookieStore).get("upstat.theme");
  const themeValue = themeCookie?.value || "system";

  // Resolve system preference on the server side for initial paint
  let initialClass = "dark";
  if (themeValue === "light") {
    initialClass = "light";
  } else if (themeValue === "dark") {
    initialClass = "dark";
  }
  // For "system", default to dark; client-side ThemeToggle will detect and apply

  return (
    <html lang="en" className={initialClass} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = document.cookie.match(/upstat\\.theme=([^;]+)/);
                  var t = theme ? theme[1] : 'system';
                  var resolved = t === 'system'
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : t;
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(resolved);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <>
          <Toaster />
          {children}
        </>
      </body>
    </html>
  );
}
