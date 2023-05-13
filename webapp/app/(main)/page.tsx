import React from 'react';
import prisma from '#libs/prisma';
import Link from 'next/link';

export default async function Page() {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return (
    <div className="container py-10 flex flex-col gap-5">
      {games.map((game) => {
        return (
          <Link
            key={`Game-${game.id}`}
            href={`/game/${game.id}`}
            className="flex shadow p-4 rounded gap-2 items-center"
          >
            <span className="font-bold text-xl w-12">#{game.id}</span>
            <p className="text-xl flex-1">{game.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
