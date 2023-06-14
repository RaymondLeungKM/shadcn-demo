import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

import AvatarButton from "./avatar-button"
import SignInButton from "./signin-button"
import SignOutButton from "./signout-button"

export default async function AuthHeader() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <>
      {session?.user && (
        <>
          <SignOutButton />
          <AvatarButton />
        </>
      )}
      {!session?.user && <SignInButton />}
    </>
  )
}
