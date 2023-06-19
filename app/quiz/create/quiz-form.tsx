"use client"

import { type } from "os"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"

const answerSchema = z.object({
  content: z.string().min(1),
  order: z.number(),
  isCorrect: z.boolean(),
})

type Answer = z.infer<typeof answerSchema>

// need to manually define this type to avoid typescript error
type Question = {
  title: string
  order: number
  answers: Answer[]
}

const questionSchema = z
  .object({
    title: z.string().min(10, {
      message: "The question title must be at least 10 characters!",
    }),
    order: z.number(),
    answers: z.array(
      z.object({
        content: z.string().min(1),
        order: z.number(),
        isCorrect: z.boolean(),
      })
    ),
  })
  .superRefine(({ title, order, answers }, ctx) => {
    const markedAsCorrectAnswersArr = answers.filter(
      (answer: { isCorrect: boolean }) => answer.isCorrect
    )
    if (markedAsCorrectAnswersArr.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "1 answer must be marked as correct per question!",
        path: ["custom"],
      })
    }
    if (markedAsCorrectAnswersArr.length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Only 1 answer should be marked as correct per question!",
        path: ["custom"],
      })

      answers.forEach((answer: Answer, index) => {
        if (answer.isCorrect) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: " ",
            path: ["answers", index],
          })
        }
      })
    }
    return z.NEVER
  })

const quizFormSchema = z.object({
  quiz_title: z.string().min(1),
  category: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "At least 1 category must be chosen" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute!" }),
  questions: z.array(questionSchema),
})

type QuizFormValues = z.infer<typeof quizFormSchema>

const defaultValues: Partial<QuizFormValues> = {
  quiz_title: "",
  category: [],
  duration: 0,
  questions: [
    {
      title: "",
      order: 0,
      answers: [
        {
          content: "",
          order: 0,
          isCorrect: false,
        },
        {
          content: "",
          order: 1,
          isCorrect: false,
        },
        {
          content: "",
          order: 2,
          isCorrect: false,
        },
        {
          content: "",
          order: 3,
          isCorrect: false,
        },
      ],
    },
  ],
}

export default function QuizForm() {
  const form = useForm<QuizFormValues>({
    resolver: async (data, context, options) => {
      console.log("formData", data)
      console.log(
        "validation result",
        await zodResolver(quizFormSchema)(data, context, options)
      )
      return zodResolver(quizFormSchema)(data, context, options)
    },
    // resolver: zodResolver(quizFormSchema),
    defaultValues,
    mode: "onChange", // at the moment, custom refine / superRefine validations can only be revalidated onSubmit T.T
    // mode: "onSubmit",
  })

  const { fields: questions_fields, append: questions_append } = useFieldArray({
    name: "questions",
    control: form.control,
  })

  const addQuestionHandler = () => {
    questions_append({
      title: "",
      order: 0,
      answers: [
        {
          content: "",
          order: 0,
          isCorrect: false,
        },
        {
          content: "",
          order: 1,
          isCorrect: false,
        },
        {
          content: "",
          order: 2,
          isCorrect: false,
        },
        {
          content: "",
          order: 3,
          isCorrect: false,
        },
      ],
    })
  }

  const onSubmit = (values: z.infer<typeof quizFormSchema>) => {
    console.log("passed all validations");
    // prepare the form data for submitting to API
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="quiz_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input placeholder="Quiz Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <MultiSelect
                  onChange={(e) => field.onChange(e)}
                  label=""
                  placeholder="Select categories"
                  data={[
                    {
                      value: "Physics",
                      label: "Physics",
                    },
                    {
                      value: "Chemistry",
                      label: "Chemistry",
                    },
                    {
                      value: "Biology",
                      label: "Biology",
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Duration</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Quiz Duration"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : 0
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="question-section space-y-4">
          {questions_fields.map((q_field, qIndex) => (
            <FormField
              control={form.control}
              key={q_field.id}
              name={`questions.${qIndex}.title`}
              render={({ field }) => (
                <div
                  className={cn(
                    form.formState.errors?.questions?.[qIndex] &&
                      "border-red-900",
                    "question border p-6 md:py-8 md:px-16 rounded-md space-y-4"
                  )}
                >
                  <p className="text-red-900">
                    {/* Diplay the custom message here */}
                    {
                      form.formState.errors?.questions?.[qIndex]?.custom
                        ?.message
                    }
                  </p>
                  <FormItem>
                    <FormLabel>Question {qIndex + 1}</FormLabel>
                    <FormDescription>Title</FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <div className="answer-section grid md:grid-cols-2 gap-4">
                    {q_field.answers.map((ans_field, aIndex) => (
                      <div className="answer flex items-end gap-4" key={aIndex}>
                        <FormField
                          control={form.control}
                          key={`question${qIndex}_ansContent${aIndex}`}
                          name={`questions.${qIndex}.answers.${aIndex}.content`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Answer {aIndex + 1}</FormLabel>
                              <FormDescription>Content</FormDescription>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          key={`question${qIndex}_ansIsCorrect${aIndex}`}
                          name={`questions.${qIndex}.answers.${aIndex}.isCorrect`}
                          render={({ field }) => (
                            <FormItem className="flex-none flex flex-col w-12 items-center text-center mt-8 mb-3">
                              <FormLabel
                                className={cn(
                                  aIndex !== 0 && "sr-only",
                                  "mb-4",
                                  "font-normal"
                                )}
                              >
                                Is Correct
                              </FormLabel>
                              <FormControl>
                                <Checkbox
                                  className={
                                    form.formState.errors.questions?.[qIndex]
                                      ?.answers?.[aIndex] &&
                                    "border-red-900 !text-red-900"
                                  }
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-1"
            onClick={addQuestionHandler}
          >
            Add Question
          </Button>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
