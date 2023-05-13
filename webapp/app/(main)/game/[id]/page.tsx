import React from 'react';
import prisma from '#libs/prisma';
import { notFound } from 'next/navigation';
import Form from './form';
import History from './history';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  const game = await prisma.game.findFirst({
    select: {
      id: true,
      name: true,
    },
    where: { id: Number(params.id) },
  });

  if (!game) {
    notFound();
  }

  return (
    <div className="container py-10">
      <p className="font-normal text-lg text-gray-500">#{game.id}</p>
      <h3 className="font-bold text-2xl mb-5">{game.name}</h3>
      <Form />
      <History />
    </div>
  );
}
