"use client"

import { useCallback, useEffect, useState } from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Separator } from "./ui/separator"

function formatDuration(value: number) {
  const minute = Math.floor(value / 60)
  const secondLeft = value - minute * 60
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
}

export default function QuizPage({ quiz }: { quiz: Quiz }) {
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number>(quiz.duration * 60)
  const [timer, setTimer] = useState<NodeJS.Timer>()
  const [chosenAnswers, setChosenAnswers] = useState(null)

  const countDownTimer = useCallback(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1
        } else {
          return 0
        }
      })
    }, 1000)
    setTimer(interval)
    return interval
  }, [])

  useEffect(() => {
    console.log("quiz=", quiz)
    const interval = countDownTimer()
    // Cleanup the timer when component unmount to avoid function being called twice
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Quiz Name: {quiz.quiz_name}</h1>
        <p>Time Remaining: {formatDuration(timeRemaining)}</p>
      </div>
      <Separator />
      <div>
        {quiz.questions.map((question: Question, index: number) => (
          <div key={question.id} className="space-y-4">
            <p>
              {index + 1}. {question.title}?
            </p>
            <RadioGroup
              className="grid sm:grid-cols-2 gap-4"
            >
              {question.answers.map((answer: Answer) => (
                <div
                  className="group border rounded-xl h-20 relative overflow-hidden flex items-center"
                  key={answer.id}
                >
                  <RadioGroupItem className="ml-4" value={answer.content} id={answer.content} />
                  <Label className="group-hover:cursor-pointer h-full w-full absolute flex items-center pl-11" htmlFor={answer.content}>{answer.content}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  )
}
