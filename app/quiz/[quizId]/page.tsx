import axios from "axios"

import { prisma } from "@/lib/prisma"
import QuizPage from "@/components/quiz-page"

const fetchQuizByQuizId = async (quizId: number) => {
  const response = await axios.get(`/api/quiz/${quizId}`)
  return response.data
}

export default async function Quiz({ params }: { params: { quizId: number } }) {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: +params.quizId,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      questions: {
        include: {
            answers: true
        }
      }
    },
  })

  return <div className="w-full">{quiz && <QuizPage quiz={quiz} />}</div>
}
