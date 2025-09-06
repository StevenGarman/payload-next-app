// src/components/blocks/BlocksCarousel.tsx
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";
import type { Page } from "@/payload-types";
import ContentBlock from "./ContentBlock";

type ContentBlockType = Extract<Page["layout"][number], { blockType: "content" }>;

export default function BlocksCarousel({ blocks }: { blocks: ContentBlockType[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* edge gradients to hint overflow */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-gray-50 to-transparent" />

        {/* custom arrows */}
        <button
          ref={prevRef}
          aria-label="Previous"
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full
                     bg-white shadow ring-1 ring-black/10 items-center justify-center hover:bg-gray-50"
        >
          ‹
        </button>
        <button
          ref={nextRef}
          aria-label="Next"
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full
                     bg-white shadow ring-1 ring-black/10 items-center justify-center hover:bg-gray-50"
        >
          ›
        </button>

        <Swiper
          modules={[Navigation, Pagination, A11y, Keyboard]}
          // bind custom buttons
          onBeforeInit={(swiper) => {
            // @ts-expect-error – Swiper types don’t know refs yet
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-expect-error
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          loop={blocks.length > 3}
          watchOverflow
        >
          {blocks.map((b) => (
            <SwiperSlide key={b.id}>
              <div className="w-[300px] sm:w-[360px] md:w-[380px]">
                <ContentBlock block={b} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
