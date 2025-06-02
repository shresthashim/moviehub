"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBox = () => {
  const router = useRouter();

  const [input, setInput] = useState("");

  interface SearchBoxFormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: SearchBoxFormEvent): void => {
    e.preventDefault();
    if (!input) {
      return;
    }
    router.push(`/search/${input}`);
  };

  return (
    <form onSubmit={handleSubmit} className='flex max-w-6xl mx-auto justify-between items-center px-5'>
      <input
        onChange={(e) => setInput(e.target.value)}
        type='text'
        placeholder='Search for a movie...'
        className='w-full h-14 rounded-sm placeholder-gray-400 outline-none bg-transparent flex-1'
        value={input}
      />
      <button disabled={!input} type='submit' className='text-amber-600 disabled:text-red-400'>
        Search
      </button>
    </form>
  );
};

export default SearchBox;
