import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

import SignInButton from "./signin-button"
import SignOutButton from "./signout-button"
import AvatarButton from "./avatar-button"

export default async function AuthHeader() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <>
      {session?.user && (
        <>
          <SignOutButton />
          <AvatarButton user={session.user} />
        </>
      )}{" "}
      {!session?.user && <SignInButton />}
    </>
  )
}
