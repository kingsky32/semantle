'use client';

import React from 'react';
import prisma from '#libs/prisma';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from '#apis/api';
import { Semantle } from '.prisma/client';

export const dynamic = 'force-dynamic';

export default function Page() {
  const query = useQuery<Semantle[]>(['semantle'], () =>
    api.get('/api/semantle').then(({ data: responseData }) => responseData),
  );

  return (
    <div className="container py-10 flex flex-col gap-5">
      {query.data
        ?.sort((a, b) => b.id - a.id)
        .map((semantle) => {
          return (
            <Link
              key={`Game-${semantle.id}`}
              href={`/semantle/${semantle.id}`}
              className="flex shadow p-4 rounded gap-2 items-center"
            >
              <span className="font-bold text-xl w-12">#{semantle.id}</span>
              <p className="text-xl flex-1">{semantle.name}</p>
            </Link>
          );
        })}
    </div>
  );
}
