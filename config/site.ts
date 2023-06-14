export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Test",
      href: "/test",
    },
    {
      title: "Payment",
      href: "/payment"
    },
    {
      title: "Quiz",
      href: "/quiz"
    },
    {
      title: ""
    }
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
  rightLinks: {
    authentication: {
      login: {
        title: "Login",
        href: "/login"
      }
    }
  },
}
