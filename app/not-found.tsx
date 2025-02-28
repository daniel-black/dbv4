import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full w-full py-10 flex flex-col items-center justify-center space-y-5">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
        <p>Please choose a Nala to guide you back home</p>
      </div>

      <Carousel className="w-[300px]">
        <Link href="/">
          <CarouselContent>
            <CarouselItem className="flex flex-col justify-between gap-3">
              <p className="text-center text-muted-foreground">happy Nala</p>
              <img
                src="happy-nala.png"
                alt="happy Nala"
                width={300}
                height={512}
              />
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-between">
              <p className="text-center text-muted-foreground">sweater Nala</p>
              <img
                src="sweater-nala.png"
                alt="sweater Nala"
                width={300}
                height={438}
              />
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-between">
              <p className="text-center text-muted-foreground">
                trazadone Nala
              </p>
              <img
                src="trazadone-nala.png"
                alt="trazadone Nala"
                width={300}
                height={365}
              />
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-between">
              <p className="text-center text-muted-foreground">pumpkin Nala</p>
              <img
                src="pumpkin-nala.png"
                alt="pumpkin Nala"
                width={300}
                height={393}
              />
            </CarouselItem>
            <CarouselItem className="flex flex-col justify-between">
              <p className="text-center text-muted-foreground">
                I frew up Nala
              </p>
              <img
                src="i-frew-up-nala.png"
                alt="i frew up Nala"
                width={300}
                height={506}
              />
            </CarouselItem>
          </CarouselContent>
        </Link>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
