"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import debounce from "lodash.debounce"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const fetchQuiz = async (categoryId?: number | null) => {
  let reqUrl = "/api/quiz"
  if (categoryId) {
    reqUrl += `?category=${categoryId}`
  }
  const response = await axios.get(reqUrl)
  return response.data
}

const fetchCategories = async () => {
  const response = await axios.get("/api/quiz/category")
  return response.data
}

export default function Quiz() {
  const [categoryId, setCategoryId] = useState<number | null>()
  const [isShowQuiz, setIsShowQuiz] = useState<boolean>()
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>()

  // not sure why categoryId is correctly set even when debounce with 0s but not without debounce
  const request = debounce(async () => {
    refetch()
  }, 0)

  const debounceRequest = useCallback(() => {
    request()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    isFetching,
    data: quizzes,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => fetchQuiz(categoryId),
    queryKey: ["quiz"],
    enabled: false,
  })

  const { isFetching: isCategoryFetching, data: categories } = useQuery({
    queryFn: async () => fetchCategories(),
    queryKey: ["category"],
  })

  const router = useRouter()

  const navigate = (quizId: number) => {
    router.push(`/quiz/${quizId}`)
  }

  useEffect(() => {
    if (isFetched && categoryId !== undefined) {
      // Add a little bit of delay to avoid showing previous questions
      setTimeout(() => {
        setIsShowQuiz(true)
      }, 100)
    } else {
      setIsShowQuiz(false)
    }
  }, [isFetched, categoryId])

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Browse all quizzes:
      </h1>
      <Separator />
      {!isShowQuiz && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Browse by category</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {isCategoryFetching && (
              <>
                <div className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center">
                  <Skeleton className="relative z-10 h-4 w-[80%] text-white font-bold text-2xl" />
                </div>
                <div className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center">
                  <Skeleton className="relative z-10 h-4 w-[80%] text-white font-bold text-2xl" />
                </div>
                <div className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center">
                  <Skeleton className="relative z-10 h-4 w-[80%] text-white font-bold text-2xl" />
                </div>
                <div className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center">
                  <Skeleton className="relative z-10 h-4 w-[80%] text-white font-bold text-2xl" />
                </div>
              </>
            )}
            {categories && (
              <>
                {categories.map((category: { id: number; name: string }) => (
                  <div
                    key={category.id}
                    className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center"
                    onClick={() => {
                      setCategoryId(category.id)
                      debounceRequest()
                    }}
                  >
                    <p className="relative z-10 text-white font-bold text-2xl">
                      {category.name}
                    </p>
                    <Image
                      className="brightness-50 group-hover:brightness-75 group-hover:scale-110 duration-500"
                      src={`/quiz-categories/${category.name.toLowerCase()}.jpg`}
                      alt={category.name}
                      fill
                    />
                  </div>
                ))}
                <div>
                  <div
                    className="cursor-pointer group border rounded-xl p-4 h-52 relative overflow-hidden grid place-items-center"
                    onClick={() => {
                      setCategoryId(null)
                      debounceRequest()
                    }}
                  >
                    <p className="relative z-10 text-white font-bold text-2xl">
                      Browse All Quiz{" "}
                      <ChevronRight className="h-4 w-4 inline-block" />
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
      {isShowQuiz && !selectedQuiz && (
        <>
          <Button onClick={() => setCategoryId(undefined)} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="grid sm:grid-cols-2 gap-4 sm:place-items-center">
            {quizzes.map((quiz: Quiz) => (
              <Card
                className="sm:min-w-[280px] md:w-[100%] cursor-pointer"
                key={quiz.id}
                onClick={() => setSelectedQuiz(quiz)}
              >
                <CardHeader>
                  <CardTitle>{quiz.quiz_name}</CardTitle>
                  <CardContent className="p-0 mt-2 space-x-2">
                    {quiz.category.map((cat) => (
                      <Badge className="text-xs" key={cat.id}>
                        {cat.name}
                      </Badge>
                    ))}
                  </CardContent>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Number of questions: {quiz._count?.questions}
                  </p>
                  <p className="text-sm">Duration: {quiz.duration} Minutes</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
      {isShowQuiz && selectedQuiz && (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Quiz Name: {selectedQuiz.quiz_name}</h1>
          <div className="space-x-2">
            {selectedQuiz.category.map((cat: { id: number; name: string }) => (
              <Badge key={cat.id}>{cat.name}</Badge>
            ))}
          </div>
          <div>
            <p>Number of questions: {selectedQuiz._count?.questions}</p>
            <p>Duration: {selectedQuiz.duration} Minutes</p>
          </div>
          <div className="flex gap-12">
            <Button variant="outline" onClick={() => setSelectedQuiz(undefined)}>
              <ChevronLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button onClick={() => navigate(selectedQuiz.id)}>Start Quiz</Button>
          </div>
        </div>
      )}
    </div>
  )
}
