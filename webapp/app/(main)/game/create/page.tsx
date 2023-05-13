'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import api from '#apis/api';
import { CreateGame } from '#app/api/game/route';
import { toast } from 'react-toastify';

export default function Page() {
  const { register, watch, handleSubmit, setValue } = useForm<{
    name: string;
    isSecret: boolean;
    password: string;
    word: string;
  }>();
  const mutation = useMutation<any, any, CreateGame>((variables) =>
    api.post<any, any, CreateGame>('/api/game', variables),
  );
  const router = useRouter();

  return (
    <form
      className="container py-10 flex flex-col gap-10"
      onSubmit={handleSubmit((data) => {
        mutation.mutate(data, {
          onSuccess: () => {
            router.push('/');
            toast.success('Created !');
          },
          onError: (error) => {
            toast.error(error);
          },
        });
      })}
    >
      <div className="flex flex-col gap-4 items-start">
        <label>
          <p className="text-lg font-medium mb-2">Game Name</p>
          <input
            {...register('name')}
            type="text"
            placeholder="Input Game Name"
            className="border rounded px-5 py-2 font-normal text-lg"
          />
        </label>
        <label className="inline-flex gap-2 items-center">
          <p className="text-lg font-medium">Secret</p>
          <input
            {...register('isSecret', {
              onChange() {
                setValue('password', '');
              },
            })}
            type="checkbox"
          />
        </label>
        <label>
          <p className="text-lg font-medium mb-2">Password</p>
          <input
            {...register('password', { required: watch('isSecret') })}
            type="password"
            placeholder="Input Password"
            className="border rounded px-5 py-2 font-normal text-lg"
            disabled={!watch('isSecret')}
          />
        </label>
        <label>
          <p className="text-lg font-medium mb-2">Word</p>
          <input
            {...register('word')}
            type="text"
            placeholder="Autogenerate..."
            className="border rounded px-5 py-2 font-normal text-lg"
          />
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 rounded bg-blue-600 text-white text-xl hover:bg-blue-500 transition-all font-light disabled:bg-gray-300"
          disabled={mutation.isLoading}
        >
          Create Game
        </button>
      </div>
    </form>
  );
}
