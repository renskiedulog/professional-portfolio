"use client";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Heading from "../global-components/heading";
import Link from "next/link";
import { FaGithub, FaGlobeAsia, FaLinkedin } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Testimonial = {
  displayName: string;
  displayPhoto: string;
  displayBio: string;
  testimonial: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
};

interface Props {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<Props> = ({ testimonials }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(testimonials.length);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay functions
  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      carouselApi?.scrollNext();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Initialize carousel API
  useEffect(() => {
    if (!carouselApi) return;

    // Set slide count and initial index
    setSlideCount(carouselApi.scrollSnapList().length);
    setSelectedIndex(carouselApi.selectedScrollSnap());

    startAutoplay();

    const handleSelect = () =>
      setSelectedIndex(carouselApi.selectedScrollSnap());

    carouselApi.on("select", handleSelect);
    carouselApi.on("pointerDown", stopAutoplay);
    carouselApi.on("pointerUp", startAutoplay);

    return () => {
      stopAutoplay();
      carouselApi.off("select", handleSelect);
      carouselApi.off("pointerDown", stopAutoplay);
      carouselApi.off("pointerUp", startAutoplay);
    };
  }, [carouselApi]);

  if (testimonials.length === 0) return null;

  return (
    <section className="w-full space-y-4">
      <Heading>Testimonials</Heading>

      <Carousel setApi={setCarouselApi} className="w-full">
        <CarouselContent>
          {testimonials.map((t, index) => (
            <CarouselItem key={index}>
              <TestimonialCard testimonial={t} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {slideCount > 1 && (
        <div className="flex justify-center gap-2 translate-y-5 sm:translate-y-0">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                carouselApi?.scrollTo(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                selectedIndex === index
                  ? "bg-primary scale-110"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <div className="flex flex-col justify-center select-none cursor-grab active:cursor-grabbing">
      {testimonial?.testimonial && (
        <p
          className={`text-gray-800 mx-auto leading-relaxed italic mb-4 text-center
          ${
            testimonial.testimonial.length > 200
              ? "text-base max-w-xl leading-normal"
              : "text-lg max-w-xl"
          }`}
        >
          "{testimonial.testimonial}"
        </p>
      )}

      <div className="flex items-center justify-center mt-auto gap-3">
        {(testimonial?.displayPhoto || testimonial?.displayName) && (
          <Avatar className="w-14 h-14 rounded-full object-cover border">
            <AvatarImage
              width={40}
              height={40}
              src={testimonial.displayPhoto}
              alt={testimonial.displayName}
              className="object-scale-down"
              loading="lazy"
            />
            <AvatarFallback>{testimonial.displayName[0]}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col gap-0.5">
          {testimonial?.displayName && (
            <span className="font-semibold text-gray-900 leading-none">
              {testimonial.displayName}
            </span>
          )}
          <span className="text-gray-500 text-xs">
            {testimonial.displayBio}
          </span>
          <div className="flex gap-1 items-center">
            {testimonial.github && (
              <Link
                href={testimonial.github}
                className="hover:opacity-80"
                target="_blank"
              >
                <FaGithub />
              </Link>
            )}
            {testimonial.portfolio && (
              <Link
                href={testimonial.portfolio}
                className="hover:opacity-80"
                target="_blank"
              >
                <FaGlobeAsia />
              </Link>
            )}
            {testimonial.linkedin && (
              <Link
                href={testimonial.linkedin}
                className="hover:opacity-80"
                target="_blank"
              >
                <FaLinkedin fill="#0e76a8" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
