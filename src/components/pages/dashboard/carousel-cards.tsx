import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
import { Card, CardContent } from "@/components/ui/card"

import img1 from "@/assets/cafe_cultivar_paraiso2_old-scaled.jpg";
import img2 from "@/assets/mudas_cafe_catigua_mg2.bk.png";
import img3 from "@/assets/IMG_8569-Sementes-de-cafe.jpg";

const imageUrls = [
  { img1, text: "Cafe Cultivar Paraiso" },
  { img2, text: "Mudas Cafe Catigua" },
];

export function CarouselCards() {
  return (
    <Carousel orientation="vertical" className="w-full max-w-xs top-2">
      <CarouselContent>
        {imageUrls.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-1">
                  <img
                    src={Object.values(imageUrl)[0].src}
                    alt={`Imagem ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </CardContent>
              </Card>
              <span className="block text-center mt-2 text-sm font-medium">{imageUrl.text}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
  