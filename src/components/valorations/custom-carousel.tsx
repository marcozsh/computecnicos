"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { FaStar } from "react-icons/fa";

export type CarouselType = {
  id: string;
  name: string;
  message: string;
  stars: number;
};

type EmblaCarouselProps = {
  valorations: CarouselType[];
  options?: EmblaOptionsType;
};

export function EmblaCarousel({ valorations, options }: EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla" dir="rtl">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {valorations.map((valoration) => (
            <div className="embla__slide" key={valoration.id}>
              <div className="embla__slide__number flex flex-col gap-10">
                <h2 className="font-bold text-xl lg:text-5xl capitalize">{valoration.name}</h2>
                <p className="font-medium text-lg lg:text-xl capitalize">{valoration.message}</p>
                <div className="font-semibold text-4xl lg:text-6xl flex flex-row text-secondary">
                {Array.from({ length: valoration.stars }).map((_, index) => (
                    <FaStar key={index} />
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
