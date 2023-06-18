import { User } from "next-auth"

import AvatarButton from "./avatar-button"
import SignOutButton from "./signout-button"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
}

export default async function AuthHeader({ user }: UserAccountNavProps) {
  return (
    <>
      {user && (
        <>
          <SignOutButton />
          <AvatarButton
            user={{ name: user.name || null, image: user.image || null }}
          />
        </>
      )}
    </>
  )
}
