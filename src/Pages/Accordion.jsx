import React, { useState } from 'react';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details className={`group ${isOpen ? 'open' : ''}`}>
      <summary
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer list-none items-center justify-between p-4 text-lg font-medium text-secondary-900 group-open:bg-gray-50"
      >
        {title}
        <div className="text-secondary-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`block h-5 w-5 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </summary>
      <div className="border-t border-t-gray-100 p-4 text-secondary-500">{content}</div>
    </details>
  );
};

const Accordion = () => {
  return (
    <div className="mx-auto max-w-lg">
         <h3 className="text-xl text-center font-bold text-purple-800 mb-4">Any Questions? Look Here</h3>
      <p className="text-gray-600 text-center mb-6">We've tried to answer most of the questions that you might have.</p>
      <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <AccordionItem title="Shipping Information" content="Find answers about shipping methods, delivery times, and tracking here." />
        <AccordionItem title="Product Information" content="We Will add More products Very Soon" />
        <AccordionItem title="Payment Related Questions" content="We Have 30 Days Money Baack Gurantee" />
      </div>
    </div>
  );
};

export default Accordion;
