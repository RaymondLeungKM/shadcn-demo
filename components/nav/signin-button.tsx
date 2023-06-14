"use client"

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignInButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signIn()}
      className={cn(
        "flex items-center text-sm font-medium text-muted-foreground"
      )}
    >
      {siteConfig.rightLinks.authentication.login.title}
    </Button>
  )
}
