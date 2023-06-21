import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const quizzes = await prisma.quiz.findMany({
        include: {
            category: true
        }
    })
    return new Response(JSON.stringify(quizzes))
}