import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Card1 from '../components/Card';

export default function Home() {
  // Define your image URL here
  const imageUrl = "/images/img1.jpeg"; // Replace with your actual image URL

  return (
    <>
      <div className="flex flex-wrap p-4 md:p-12 mt-6">
        {/* Div for Card1 with adjusted width, centering, and deeper black shadow */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-3/4 mt-4 shadow-2xl"> {/* Applying a deeper shadow */}
            <Card1 />
          </div>
        </div>
        {/* Div for the Image with 50% width, ensuring it matches the card's dimensions */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-14">
          <div className="w-3/4 mt-4" style={{ position: 'relative', height: 'same-as-card-height', width: '100%' }}> {/* Adjust 'height' according to your Card's dimensions */}
          <Image src="/images/img7.jpeg" alt="Image 7" width={400} height={200} />
          </div>
        </div>
      </div>
    </>
  );
}