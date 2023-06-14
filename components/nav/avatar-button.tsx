"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useSession } from "next-auth/react"

import { Button } from "../ui/button"

export default function AvatarButton() {
  const { data: session } = useSession()
  console.log(session)

  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="relative place-items-center grid shrink-0 overflow-hidden rounded-full h-8 w-8 mr-2">
        <AvatarImage src={session?.user?.image!} alt={session?.user?.name!} />
        {/* Should be a fallback image instead */}
        <AvatarFallback>{session?.user?.name?.substring(0, 2)}</AvatarFallback>
      </Avatar>
    </Button>
  )
}
