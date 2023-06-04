import { prisma } from "./db"

export async function fetchQuizzes() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      category: true,
    },
  })

  return quizzes;
}
