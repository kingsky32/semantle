'use client';

import React from 'react';
import { generateSecret } from '#utils/generateSecret';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { GuessSemantleRequest } from '#app/api/semantle/[id]/route';
import api from '#apis/api';
import { SemantleHistory } from '@prisma/client';

export interface FormProps {
  id: number;
}

export default function Form({ id }: FormProps) {
  const { register, handleSubmit, setValue } = useForm<{
    name: string;
    word: string;
  }>({
    defaultValues: {
      name: generateSecret(),
    },
  });
  const lastWord = React.useRef<string>('');
  const mutation = useMutation<SemantleHistory, any, GuessSemantleRequest>(
    (variables) =>
      api
        .post<any, any, GuessSemantleRequest>(`/api/semantle/${id}`, {
          name: variables.name,
          word: variables.word,
        })
        .then(({ data: responseData }) => responseData),
  );
  return (
    <div className="flex flex-col gap-2 mb-5">
      <form
        className="flex gap-4"
        onSubmit={handleSubmit((data) => {
          lastWord.current = data.word;
          mutation.mutate(
            {
              name: data.name,
              word: data.word,
            },
            {
              onSuccess: () => {
                setValue('word', '');
              },
            },
          );
        })}
      >
        <label>
          <p className="text-sm font-light mb-2">Name</p>
          <input
            {...register('name', { required: true })}
            type="text"
            placeholder="Input Name"
            className="border rounded px-3 py-2 font-normal text-sm"
          />
        </label>
        <label className="block flex-1">
          <p className="text-sm font-light mb-2">Word</p>
          <input
            {...register('word', { required: true })}
            type="text"
            placeholder="Input Word"
            className="border rounded px-3 py-2 font-normal text-sm block w-full"
          />
        </label>
        <button
          type="submit"
          className="px-5 py-2 rounded bg-blue-600 text-white text-xl hover:bg-blue-500 transition-all font-light disabled:bg-gray-300"
          disabled={mutation.isLoading}
        >
          Submit
        </button>
      </form>
      {mutation.error && (
        <p className="text-red-500">
          This {lastWord.current} word is an unknown word
        </p>
      )}
      {mutation.data && (
        <table width="100%">
          <colgroup>
            <col width={70} />
            <col width={200} />
            <col width={150} />
            <col width={100} />
            <col />
          </colgroup>
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Word</th>
              <th className="text-left p-2">Rate</th>
              <th className="text-left p-2">Ranking</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-left p-2">{mutation.data.id}</td>
              <td className="text-left p-2">{mutation.data.name}</td>
              <td className="text-left p-2">{mutation.data.guess}</td>
              <td className="text-left p-2">
                {(mutation.data.sim * 100).toFixed(4)}
              </td>
              <td className="text-left p-2">{mutation.data.rank}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
