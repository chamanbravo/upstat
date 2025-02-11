import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "Upstat",
  },
  disableThemeSwitch: true,
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
    {
      text: "Github",
      url: "https://github.com/chamanbravo/upstat",
      active: "nested-url",
    },
    {
      text: "Demo",
      url: "https://upstat.chamanbudhathoki.com.np/",
      active: "nested-url",
    },
  ],
};
