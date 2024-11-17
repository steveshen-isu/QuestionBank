import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search') || '';

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ],
    },
  });

  return NextResponse.json(questions);
}
