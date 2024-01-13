
'use client'
import React, {useState} from 'react';
import {FiChevronDown, FiChevronUp} from 'react-icons/fi';

// Define the FAQAccordionDark component
const FAQAccordionDark = () => {
    // Define the FAQs
    const faqs = [
        {
            question: 'What is the purpose of this website?',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            question: 'How can I search for movies?',
            answer: 'Nulla facilisi. Sed sit amet gravida libero, ut suscipit urna.',
        },
        // Add more FAQs as needed
    ];

    // Set up state to track active index
    const [activeIndex, setActiveIndex] = useState(null);

    // Function to toggle accordion
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Render the FAQAccordionDark component
    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl mb-6 font-bold text-center text-white">Frequently Asked Questions</h2>
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="bg-gray-800 p-6 rounded-lg shadow-md mb-4 cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                        {activeIndex === index ? <FiChevronUp className="text-white"/> :
                            <FiChevronDown className="text-white"/>}
                    </div>
                    {activeIndex === index && <p className="mt-4 text-white">{faq.answer}</p>}
                </div>
            ))}
        </div>
    );
};

// Export the FAQAccordionDark component
export default FAQAccordionDark;
