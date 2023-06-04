import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.rightLinks.authentication.login.href}
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground"
              )}
            >
              {siteConfig.rightLinks.authentication.login.title}
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
