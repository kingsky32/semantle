import { NextResponse } from 'next/server';
import api from '#apis/api';
import prisma from '#libs/prisma';

export interface GuessSemantleRequest {
  name: string;
  word: string;
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const semantle = await prisma.semantle.findFirst({
    where: {
      id: Number(params.id),
    },
  });
  if (!semantle) return new Response(undefined, { status: 404 });
  const guessGameRequest: GuessSemantleRequest = await request.json();
  const guess = await api
    .get<{
      guess: string;
      rank: string;
      sim: number;
    }>(
      `${process.env.SEMANTLE_API_URL}/guess/${semantle.guessId}/${guessGameRequest.word}`,
    )
    .then(({ data: responseData }) => responseData);
  const semantleHistory = await prisma.semantleHistory.create({
    data: {
      name: guessGameRequest.name,
      guess: guess.guess,
      rank: guess.rank,
      sim: guess.sim,
      semantleId: semantle.id,
    },
  });
  return NextResponse.json(semantleHistory);
}
