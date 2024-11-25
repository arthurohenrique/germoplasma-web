import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import img1 from "@/assets/cafe_cultivar_paraiso2_old-scaled.jpg";
import img2 from "@/assets/mudas_cafe_catigua_mg2.bk.png";
import img3 from "@/assets/MG_1602-viveiro-mudas-de-cafe-Foto-Samantha-Mapa-scaled-1-2048x1366.jpg";
import img4 from "@/assets/IMG_8569-Sementes-de-cafe.jpg";
import img5 from "@/assets/IMG_6150-Cafe-Conilon-scaled-1-2048x1366.jpg";

const imageUrls = [
  { img: img1, text: "Café Cultivar Paraiso" },
  { img: img2, text: "Mudas Café Catigua" },
  { img: img3, text: "Viveiro Mudas de Café" },
  { img: img4, text: "Sementes de Café" },
  { img: img5, text: "Café Conilon" },
];

export function CarouselCards() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs mt-10"
    >
      <CarouselContent className="-mt-1 h-[250px] mb-56">
        {imageUrls.map((imageUrl, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-1">
                  <img
                    src={imageUrl.img.src}
                    alt={imageUrl.text}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
              <span className="block text-center mt-2 text-sm font-medium">
                {imageUrl.text}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
