'use client';

import React from 'react';
import { generateSecret } from '#utils/generateSecret';

export default function Form() {
  return (
    <form className="flex gap-4 mb-5">
      <label>
        <p className="text-sm font-light mb-2">Name</p>
        <input
          name="name"
          type="text"
          placeholder="Input Name"
          className="border rounded px-3 py-2 font-normal text-sm"
          required
          defaultValue={generateSecret()}
        />
      </label>
      <label className="block flex-1">
        <p className="text-sm font-light mb-2">Word</p>
        <input
          name="word"
          type="text"
          placeholder="Input Word"
          className="border rounded px-3 py-2 font-normal text-sm block w-full"
          required
        />
      </label>
      <button
        type="submit"
        className="px-5 py-2 rounded bg-blue-600 text-white text-xl hover:bg-blue-500 transition-all font-light disabled:bg-gray-300"
      >
        Submit
      </button>
    </form>
  );
}
