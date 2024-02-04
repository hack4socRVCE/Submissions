"use client"

import InputForm from "@/components/Input/InputForm";
import { Button , Chip} from "@nextui-org/react";
import { useChipsStore } from "@/store/useChipsStore";
import pic from '@/public/1.svg'
import Image from "next/image";


export default function Product( ) {
    const chips = useChipsStore((state) => state.chips);
     const handleRemoveChip = (index: number) => {
    useChipsStore.setState((state) => ({ chips: state.chips.filter((_, i) => i !== index) }));};
   
    
    return (
        <>
    <section className="relative lg:min-h-[300px]  pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
      

           
            <div className=" -mt-8 mx-auto text-center">
                <h1 className="text-4xl font-bold sm:text-6xl">
                    <span className="text-[#110B09]"> Uncover the Hidden Secrets of ur beloved products ✨ </span>
                 </h1>
                
                <h3 className="mt-5 text-3xl font-bold text-[#BA7969] sm:text-3xl"> Securely Sorted , Wisely Chosen  </h3>

              <div className="flex justify-center pt-4 mx-10">
                <InputForm />
                </div>           
         <div style={{ marginTop: '30px', display:'flex', gap:'16px'  }}>
            {chips.map((chip, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
          <Chip size="lg"  variant="faded"  radius="lg" onClose={() => handleRemoveChip(index)} >{chip}</Chip>
           </div>
              ))}
           </div>
         </div>
        </div>
       
    </section>
    <section className="bg-slate-100 px-10 py-12 flex justify-between gap-4">
       <div className=" w-2/5">
        <h5>⚠️ Harmful Ingredients Alert</h5>
        <p className="text-pretty mt-2">Discover whats really in your products. We flag harmful ingredients and outline their potential side effects, empowering you to make healthier choices for you and your family.</p>
       </div>
       <div className=" w-2/5">
        <h5>🌿 Safer Alternatives Await</h5>
        <p className="text-pretty mt-2">Not satisfied with your products safety score? We doesnt just stop at analysis – we recommend safer alternatives with higher safety scores. Step into a world where quality meets safety, and your choices align with your health goals..</p>
       </div>
       <div className=" w-2/5">
        <h5>🦄 Join the Symphony</h5>
        <p className="text-pretty mt-2">Harmonize your choices, live elegantly – IsWiseChoice: Your passage to an immersive, confident, and healthier shopping symphony</p>
       </div>
    </section>
    <hr className="bg-[#f4f4f5] h-[5px]"/>
    <section className="bg-slate-100 px-10 py-12 flex justify-between gap-4">
        <div className="flex-1 px-8 py-10 drop-shadow-2xl w-full h-fit border-2 rounded-2xl flex-row items-center">
            <h5 className="mb-5 border-b-4 border-[#f0c3c0] w-fit">💫 Why Choose IsWiseChoice?</h5>
            <span className="flex-row mb-2">
                <h6 className="text-md font-semibold">Transcendent Insights</h6>
                <p>Peel back the layers with our immersive ingredient analysis.</p>
            </span>
            -
            <span className="flex-row mb-2">
                <h6 className="text-md font-semibold">Harmony in Numbers</h6>
                <p>Your safety score, a unique note in your shopping melody.</p>
            </span>
            -
            <span className="flex-row mb-2">
                <h6 className="text-md font-semibold">Alternatives Unveiled</h6>
                <p>Explore a garden of safer options for a refined lifestyle..</p>
            </span>
            -
            <span className="flex-row mb-2">
                <h6 className="text-md font-semibold">Compose Your Journey</h6>
                <p>Craft your symphony with an account that echoes your preferences.</p>
            </span>
        </div>
        <div className="flex-1 px-8 py-10 drop-shadow-2xl w-full h-fit border-2 rounded-2xl">
        <h5 className="mb-5 border-b-4 border-[#f0c3c0] w-fit">🔍 How it Works?</h5>
            <span className="flex-row mb-2">
                <h6 className="text-md font-semibold">Paste Your Amazon Link</h6>
                <p>Simply copy and paste the Amazon product link youre curious about into our intuitive interface.</p>
            </span>
            -
            <span className="flex-row mb-2">
                <h6 className="text-md font-semibold">Comprehensive Ingredient Analysis</h6>
                <p>Our advanced algorithms analyze the products ingredients, identifying potential harmful substances and their associated side effects.</p>
            </span>
            -
            <span className="flex-row mb-2">
                <h6 className="text-md font-semibold">Safety Score</h6>
                <p>Receive a personalized safety score for your product, ranging from 1 to 100, with 100 being the safest. Make confident decisions based on real data!</p>
            </span>
        </div>
    </section>
    <section className="bg-slate-100 px-10 py-12 flex justify-between gap-4">
    <div className="max-w-2xl mx-auto text-center lg:w-full">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Join Us in our mission to Educate the masses...</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">A small strp towards healthier, happier and safer lives..</p>
        </div>
    <form action="#" className="mt-12 sm:mx-auto sm:flex sm:max-w-lg w-full ">
                <div className="min-w-0 flex-1">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    className="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="block w-full rounded-md border border-transparent bg-[#f0c3c0] px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                  >
                    Join
                  </button>
                </div>
              </form>
              </section>
        </>
    );
}