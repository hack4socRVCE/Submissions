import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MyCarousel: React.FC = () => {
  return (
    <Carousel  
      opts={{
      align: "start",
      loop: true,
    }}>
      <CarouselContent >
        <CarouselItem className="rounded-lg overflow-hidden"><Image src="/images/img1.jpg" alt="Image 1" width={500} height={300} /></CarouselItem>
        <CarouselItem>Item 2 content here</CarouselItem>
        <CarouselItem><Image src="/images/img6.jpeg" alt="Image 6" width={1000} height={1000} /></CarouselItem>
        <CarouselItem><Image src="/images/img2.jpg" alt="Image 2" width={500} height={300} /></CarouselItem>
        <CarouselItem><Image src="/images/img4.jpeg" alt="Image 4" width={1000} height={1000} /></CarouselItem>
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MyCarousel;