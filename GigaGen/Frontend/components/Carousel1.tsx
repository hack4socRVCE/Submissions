import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define the props type to include an array of images, each with a URL and an alt text
interface MyCarouselProps {
  images: {
    url: string;
    alt: string;
  }[];
}

const MyCarousel: React.FC<MyCarouselProps> = ({ images }) => {
  return (
    <Carousel  
      opts={{
        align: "start",
        loop: true,
      }}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="rounded-lg overflow-hidden">
            {/* Here, the Image component uses layout="fill" and objectFit="cover" 
                to ensure the image covers the item area without specifying width and height */}
            <Image src={image.url} alt={image.alt} layout="fill" objectFit="cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MyCarousel;
