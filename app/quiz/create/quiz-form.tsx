"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

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
import { cn } from "@/lib/utils"

const quizFormSchema = z.object({
  quiz_title: z.string().min(1),
  category: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1, { message: "At least 1 category must be chosen" }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute!" }),
  questions: z.array(
    z.object({
      title: z.string().min(10, {
        message: "The question title must be at least 10 characters!",
      }),
      order: z.number(),
    })
  ),
  answers: z.array(
    z.object({
      content: z.string().min(1),
      order: z.number(),
      isCorrect: z.boolean(),
    })
  ),
})

type QuizFormValues = z.infer<typeof quizFormSchema>

const defaultValues: Partial<QuizFormValues> = {
  quiz_title: "",
  category: [],
  duration: 0,
  questions: [],
  answers: [],
}

export default function QuizForm() {
  const form = useForm<QuizFormValues>({
    // resolver: async (data, context, options) => {
    //   console.log("formData", data)
    //   console.log(
    //     "validation result",
    //     await zodResolver(quizFormSchema)(data, context, options)
    //   )
    //   return zodResolver(quizFormSchema)(data, context, options)
    // },
    resolver: zodResolver(quizFormSchema),
    defaultValues,
    // mode: "onChange",
    mode: "onSubmit",
  })

  const { fields: questions_fields, append: questions_append } = useFieldArray({
    name: "questions",
    control: form.control,
  })

  const { fields: answers_fields, append: answers_append } = useFieldArray({
    name: "answers",
    control: form.control,
  })

  const addQuestionHandler = () => {
    questions_append({ title: "", order: 0 })
    answers_append([
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
    ])
  }

  const onSubmit = (values: z.infer<typeof quizFormSchema>) => {
    console.log("values=", values)
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
          {questions_fields.map((q_field, index) => (
            <FormField
              control={form.control}
              key={q_field.id}
              name={`questions.${index}.title`}
              render={({ field }) => (
                <div className="question border p-6 md:py-8 md:px-16 rounded-md space-y-4">
                  <FormItem>
                    <FormLabel>Question {index + 1}</FormLabel>
                    <FormDescription>Title</FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <div className="answer-section grid md:grid-cols-2 gap-4">
                    {answers_fields.map((ans_field, index) => (
                      <div className="answer flex items-end gap-4" key={index}>
                        <FormField
                          control={form.control}
                          key={"ansContent_" + ans_field.id}
                          name={`answers.${index}.content`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Answer {index + 1}</FormLabel>
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
                          key={"isCorrect_" + ans_field.id}
                          name={`answers.${index}.isCorrect`}
                          render={({ field }) => (
                            <FormItem className="flex-none flex flex-col w-12 items-center text-center mt-8 mb-3">
                              <FormLabel className={cn(index !== 0 && "sr-only", "mb-4", "font-normal")}>Is Correct</FormLabel>
                              <FormControl>
                                <Checkbox
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
