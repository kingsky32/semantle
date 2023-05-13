import { NextResponse } from 'next/server';
import prisma from '#libs/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const semantle = await prisma.semantle.findFirst({
    where: { id: Number(params.id) },
  });
  if (!semantle) return new Response(undefined, { status: 404 });
  return NextResponse.json(
    await prisma.semantleHistory.findMany({
      where: {
        semantleId: semantle.id,
      },
    }),
  );
}
