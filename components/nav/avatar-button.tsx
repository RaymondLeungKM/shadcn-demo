"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import { Button } from "../ui/button"

export default function AvatarButton({
  user,
}: {
  user: { name: string; email: string; image: string }
}) {
  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="relative place-items-center grid shrink-0 overflow-hidden rounded-full h-8 w-8">
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
    </Button>
  )
}
