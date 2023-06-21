import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import QuizCreate from "@/app/quiz/create/page"

export async function POST(req: Request) {
  const session = await getAuthSession()

  // for isAdmin to work, update in nextAuth jwt config is required
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 })
  } else {
    try {
      const username = session.user.name
      const reqBody = await req.json();

      const { quiz_name, category, duration, questions } = z
        .object({
          quiz_name: z.string(),
          category: z.array(z.string()),
          duration: z.number(),
          questions: z.array(
            z.object({
              title: z.string(),
              order: z.number(),
              answers: z.array(
                z.object({
                  content: z.string(),
                  order: z.number(),
                  isCorrect: z.boolean(),
                })
              ),
            })
          ),
        })
        .parse(reqBody)

      console.log("passed zod checking");

      const categories = await prisma.category.findMany({
        where: {
          name: {
            in: category,
          },
        },
        select: {
          id: true,
        },
      })

      console.log("categories=", categories);

      const newQuiz = await prisma.quiz.create({
        data: {
          quiz_name: quiz_name,
          category: {
            connect: categories,
          },
          duration: duration,
          created_by: username ?? "System",
        },
      })

      // extract the id from the created quiz
      for await (const question of questions) {
        const newQuestion = await prisma.question.create({
          data: {
            title: question.title,
            order: question.order,
            quizId: newQuiz.id,
            created_by: username ?? "System",
          },
        })

        const modifiedAnswerArr = question.answers.map(
          (answer: { content: string; order: number; isCorrect: boolean }) => {
            return {
              content: answer.content,
              order: answer.order,
              isCorrect: answer.isCorrect,
              questionId: newQuestion.id,
              created_by: username ?? "System",
            }
          }
        )
        const newAnswerCount = await prisma.answer.createMany({
          data: modifiedAnswerArr,
        })
      }

      const createdQuiz = await prisma.quiz.findFirst({
        where: {
          id: {
            equals: newQuiz.id,
          },
        },
        include: {
          questions: {
            include: {
              answers: {
                select: {
                  id: true,
                  content: true,
                  order: true,
                  questionId: true,
                },
              },
            },
          },
        },
      })
      console.log(createdQuiz)
      return new Response(JSON.stringify(createdQuiz), { status: 201 })
    } catch (error) {
      return new Response("Could not create quiz", { status: 500 })
    }
  }
}
