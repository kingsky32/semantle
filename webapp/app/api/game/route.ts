import prisma from '#libs/prisma';

export interface CreateGame {
  name?: string;
  isSecret?: boolean;
  password?: string;
  word?: string;
}

export async function POST(request: Request) {
  const createGame: CreateGame = await request.json();
  await prisma.game.create({
    data: {
      name:
        createGame.name ||
        `Game ${
          ((await (
            await prisma.game.findFirst({ orderBy: { id: 'desc' } })
          )?.id) ?? 0) + 1
        }`,
      isSecret: createGame.isSecret ?? false,
      password: createGame.password,
      word: createGame.word ?? 'word',
    },
  });
  return new Response(undefined, {
    status: 201,
  });
}
