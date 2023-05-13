import React from 'react';
import prisma from '#libs/prisma';
import { notFound } from 'next/navigation';
import Form from './form';
import History from './history';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
  const semantle = await prisma.semantle.findFirst({
    select: {
      id: true,
      name: true,
    },
    where: { id: Number(params.id) },
  });

  if (!semantle) {
    notFound();
  }

  return (
    <div className="container py-10">
      <p className="font-normal text-lg text-gray-500">#{semantle.id}</p>
      <h3 className="font-bold text-2xl mb-5">{semantle.name}</h3>
      <Form id={semantle.id} />
      <History id={semantle.id} />
    </div>
  );
}
