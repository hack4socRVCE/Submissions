import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Chip, Divider, CardBody, CardFooter } from '@nextui-org/react';

interface HarmfulIngredient {
  name: string;
  limit: string;
  harmfulIngredients: string[];
}

const SideEffectsCards: React.FC = () => {
  const [harmfulIngredientsData, setHarmfulIngredientsData] = useState<HarmfulIngredient[]>([]);

  useEffect(() => {
    // Simulated API response
    const apiResponse: HarmfulIngredient[] = [
      {
        name: 'Harmful Ingredient 1',
        limit: 'X mg/day',
        harmfulIngredients: ['Substance A', 'Substance B', 'Substance C'],
      },
      {
        name: 'Harmful Ingredient 2',
        limit: 'Y mg/day',
        harmfulIngredients: ['Substance D', 'Substance E', 'Substance F'],
      },
      {
        name: 'Harmful Ingredient 3',
        limit: 'Z mg/day',
        harmfulIngredients: ['Substance G', 'Substance H', 'Substance I'],
      },
      {
        name: 'Harmful Ingredient 4',
        limit: 'W mg/day',
        harmfulIngredients: ['Substance J', 'Substance K', 'Substance L'],
      },
    ];

    setHarmfulIngredientsData(apiResponse);
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <>
    <div className='grid grid-cols-2 gap-8' >
      {harmfulIngredientsData.map((ingredient, index) => (
        <div
          key={index}
          className="w-72 bg-white rounded-b-lg border-t-8 border-[#F31260] px-4 py-5 justify-around shadow-md"
        >
          <p className="text-lg font-bold font-sans">{ingredient.name}</p>
          <div className="py-3">
            <p className="text-gray-400 text-sm">{ingredient.harmfulIngredients.join(', ')}</p>
          </div>
          <div className="flex justify-between">
            <svg
              className="w-6 h-6"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            <div className="text-sm flex gap-2">
              <button className="bg-slate-200 px-2 rounded-xl hover:bg-slate-400 transition-colors ease-in-out">
                {`Download (${ingredient.limit})`}
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default SideEffectsCards;
