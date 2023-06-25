import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: +params.quizId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      questions: true,
    },
  })
  if (quiz) {
    return NextResponse.json(quiz)
  } else {
    return new Response("Quiz not found", { status: 404 })
  }
}
