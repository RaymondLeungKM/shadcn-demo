"use client"

import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => signOut()}
      className={cn(
        "flex items-center text-sm font-medium text-muted-foreground"
      )}
    >
      Logout
    </Button>
  )
}
