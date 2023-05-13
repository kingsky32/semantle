import prisma from '#libs/prisma';

export interface CreateSemantleRequest {
  name?: string;
  isSecret?: boolean;
  password?: string;
  word?: string;
}

export async function POST(request: Request) {
  const createSemantleRequest: CreateSemantleRequest = await request.json();
  await prisma.semantle.create({
    data: {
      name:
        createSemantleRequest.name ||
        `Game ${
          ((await (
            await prisma.semantle.findFirst({ orderBy: { id: 'desc' } })
          )?.id) ?? 0) + 1
        }`,
      isSecret: createSemantleRequest.isSecret ?? false,
      password: createSemantleRequest.password,
      guessId: Math.round(Math.random() * 4650),
    },
  });
  return new Response(undefined, {
    status: 201,
  });
}
