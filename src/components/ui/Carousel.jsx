import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Carousel = ({
  images = [
    {
      src: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 1",
      name: "Mountain View",
    },
    {
      src: "https://images.unsplash.com/photo-1593069567131-53a0614dde1d?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 2",
      name: "Ocean Paradise",
    },
    {
      src: "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 3",
      name: "Forest Retreat",
    },
    {
      src: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?q=80&w=2286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Slide 4",
      name: "Desert Oasis",
    },
  ],
  autoPlay = true,
  interval = 10000,
  height = "h-56 md:h-200",
  showIndicators = true,
  showArrows = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-[90dvw] md:max-w-7xl overflow-hidden">
      {/* Carousel container */}
      <div className={`relative overflow-hidden ${height}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-start justify-end p-8">
              <h3 className="text-white text-xl md:text-2xl font-nata font-medium text-center uppercase">
                explore
              </h3>
            </div>

            {/* Name overlay in the center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white text-xl md:text-9xl font-marcellus font-bold text-center">
                {image.name}
              </h3>
            </div>

            <div className="absolute inset-0 flex items-end justify-start p-8">
              <h3 className="text-white text-xl md:text-2xl font-nata font-medium text-center uppercase">
                {image.place}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      {showIndicators && (
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse bg-neutral-400/40 opacity-95 py-5 px-20 border border-neutral-50 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-2 h-2 rounded-full ${
                index === currentSlide
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-current={index === currentSlide}
              aria-label={`Slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={prevSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/70 group-focus:outline-none transition-all">
              <ChevronLeftIcon className="w-6 h-6 text-white" />
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={nextSlide}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/70 group-focus:outline-none transition-all">
              <ChevronRightIcon className="w-6 h-6 text-white" />
              <span className="sr-only">Next</span>
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
