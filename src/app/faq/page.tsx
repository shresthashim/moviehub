"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQAccordion = () => {
  const faqs: { question: string; answer: string }[] = [
    {
      question: "What is the MovieHub",
      answer: "MovieHub is a movie website where the trending, top rated and currently aired movies are shown.",
    },
    {
      question: "How can I search for movies?",
      answer: "You can search for movies by clicking on the search icon in the navbar and typing in the search bar.",
    },
    {
      question: "From where the datas are fetched?",
      answer: "The movies data are fetched from TMDB (The MovieDataBase) API.",
    },
    {
      question: "What kind of details can we see from this movie website?",
      answer: "You can see the details of the movie like the overview, release date, vote count, vote average, genres, etc.",
    },
    {
      question: "Can we see the reviews of the movies?",
      answer: "Yes, you can see the reviews of the movies by clicking on the reviews button in the movie details page.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-3xl mb-6 font-bold text-center'>Frequently Asked Questions</h2>
      {faqs.map((faq, index: number) => (
        <div
          key={index}
          className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4 cursor-pointer'
          onClick={() => toggleAccordion(index)}
        >
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>{faq.question}</h3>
            {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
          </div>
          {activeIndex === index && <p className='mt-4'>{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
