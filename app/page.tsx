import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <section className="container space-y-8 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-4">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Your one-stop quiz website
          <br className="hidden sm:inline" />
          We have quizzes in every possible subject you can think of!
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
        <div>
          <h1>Server Session</h1>
          <pre>{JSON.stringify(session)}</pre>
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          href="/quiz"
          className={buttonVariants()}
        >
          Browse Quiz
        </Link>
      </div>
    </section>
  )
}
