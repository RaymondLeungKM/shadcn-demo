import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  return NextResponse.json(categories)
}
