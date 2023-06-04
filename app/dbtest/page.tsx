import { fetchQuizzes } from "@/server/api"
import { prisma } from "@/server/db"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function dbtest() {
  const quizzes = await fetchQuizzes()

  return (
    <div className="container w-[80vw] mt-12 grid grid-cols-2 gap-12">
      {quizzes.map((quiz) => (
        <Card className="cursor-pointer">
          <CardHeader>
            <CardTitle>{quiz.quiz_name}</CardTitle>
            <div className="quiz-categories pt-2">
              {quiz.category.map((cat) => (
                <Badge variant="secondary" className="mr-2">{cat.name}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <p>Quiz duration: {quiz.duration} mins</p>
          </CardContent>
          <CardFooter>
            <p>Quiz created at: {quiz.created_date.toLocaleDateString()}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
