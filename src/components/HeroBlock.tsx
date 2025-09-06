// src/components/blocks/HeroBlock.tsx
import { Page } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";

export default function HeroBlock({ block }: { block: Page["layout"][0] }) {
  const { heading, subheading, image, cta_button } = block;

  const imgUrl = typeof image === "object" && image?.url ? image.url : null;
  const imgAlt =
    typeof image === "object" ? image.alt || image.filename || heading : "";

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">
      {/* Image full width in the background */}
      {imgUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imgUrl}
            alt={imgAlt}
            fill
            className="object-cover object-center opacity-50"
            priority
          />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center text-gray-900">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{heading}</h1>

        <div className="max-w-2xl mx-auto text-lg md:text-xl prose prose-gray prose-invert mb-8">
          <RichText data={subheading} />
        </div>

        {cta_button?.url && cta_button?.label && (
          <Link
            href={cta_button.url}
            className="inline-block bg-black text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
          >
            {cta_button.label}
          </Link>
        )}
      </div>
    </section>
  );
}
