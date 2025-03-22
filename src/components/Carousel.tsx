import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselsProps {
  array: any[];
  renderContent: (index: number) => React.ReactNode;
}

export function Carousels({ array, renderContent }: CarouselsProps) {
  return (
    <Carousel className="w-full md:w-10/12 mx-auto max-w-7xl">
      <CarouselContent>
        {array.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6 text-primary">
                  {renderContent(index)}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
