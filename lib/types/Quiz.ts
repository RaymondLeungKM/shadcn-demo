type Quiz = {
    id: number,
    quiz_name: string
    duration: number
    category: Category[]
    questions: Question[]
    _count?: {
        questions: number
    }
}