"use client"
import React, { useState, useEffect } from 'react';
import { MdArrowOutward } from "react-icons/md";
interface RecomendedProps {
  name: string;
  SafetyScore: string;
  Description: string[];
}

const Recomended: React.FC = () => {
  const [harmfulIngredientsData, setHarmfulIngredientsData] = useState<RecomendedProps[]>([]);

  useEffect(() => {
    const apiResponse: RecomendedProps[] = [
      {
        name: 'ProductName',
        SafetyScore: 'X mg/day',
        Description: ['This is a product description'],
      },
      {
        name: 'Harmful Ingredient 2',
        SafetyScore: 'Y mg/day',
        Description: ['This is a product description'],
      },
      {
        name: 'Harmful Ingredient 3',
        SafetyScore: 'Z mg/day',
        Description: ['This is a product description'],
      },
    ];

    setHarmfulIngredientsData(apiResponse);
  }, []);

  return (
    <>
    <section className="py-10 w-full bg-gray-100 lg:w-full sm:py-16 ">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:w-full">
        <div className="max-w-2xl mx-auto text-center lg:w-full">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Recommended Products</h2>
          
        </div>

        <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-3 sm:grid-cols-2">
          {harmfulIngredientsData.map((testimonial, index) => (
  <div key={index} className="overflow-hidden bg-white rounded-md">
    <div className="px-5 py-6">
      <div className="flex items-center justify-between">
        <img
          className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
          src={`https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-${index + 1}.jpg`}
          alt=""
        />
        <div className="min-w-0 ml-3 mr-auto">
          <p className="text-base font-semibold text-black truncate">{testimonial.name}</p>
          <p className="text-sm text-gray-600 truncate">@{testimonial.name.toLowerCase()}</p>
          
        </div>
        <button>
        <MdArrowOutward size={20} />
        </button>
      </div>
      <blockquote className="mt-5">
        <p className="text-base text-gray-800">
          {testimonial.Description[0]}
          <span className="block text-sky-500">{testimonial.SafetyScore}</span>
        </p>
      </blockquote>
    </div>
  </div>
))}

           

         
           

          

          
          

          
        </div>
    </div>
</section>

    </>
  );
};

export default Recomended;
