"use client"

import Image from "next/image"
import { User } from "@prisma/client"
import { AvatarProps } from '@radix-ui/react-avatar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { Icons } from "@/components/icons"

import { Button } from "../ui/button"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

export default function AvatarButton({ user, ...props }: UserAvatarProps) {
  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full !mr-2">
      <Avatar {...props}>
        {user.image ? (
          <div className="relative aspect-square h-full w-full">
            <Image
              fill
              src={user.image}
              alt="profile picture"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <AvatarFallback>
            <span className="sr-only">{user?.name}</span>
            <Icons.user className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
    </Button>
  )
}
