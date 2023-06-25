import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const categoryIds = req.nextUrl.searchParams
    .get("category")
    ?.split(",")
    .map((val) => parseInt(val))
  let whereClause = {}
  if (categoryIds) {
    whereClause = {
      category: {
        some: {
          id: {
            in: categoryIds,
          },
        },
      },
    }
  }
  const quizzes = await prisma.quiz.findMany({
    include: {
      category: true,
      _count: {
        select: {
          questions: true,
        },
      },
    },
    where: whereClause,
  })
  return NextResponse.json(quizzes)
}
