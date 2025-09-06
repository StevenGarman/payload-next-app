// src/components/blocks/ContentBlock.tsx
import type { Page } from "@/payload-types";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";

type ContentBlockType = Extract<Page["layout"][number], { blockType: "content" }>;

export default function ContentBlock({ block }: { block: ContentBlockType }) {
  const { heading, content, image, cta } = block as any;

  const img =
    typeof image === "object" && image?.url
      ? { url: image.url, alt: image.alt || image.filename || heading }
      : null;

  return (
    <article className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {img && (
        <div className="relative w-full h-36 sm:h-40 md:h-44">
          <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="320px" />
        </div>
      )}

      <div className="p-4 sm:p-5 flex-1 flex flex-col text-center">
        {heading && (
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {heading}
          </h3>
        )}

        {content && (
          <div
            className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-4
                       [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4"
          >
            <RichText data={content} />
          </div>
        )}

        {cta?.url && cta?.label && (
          <Link
            href={cta.url}
            target={cta.url.startsWith("http") ? "_blank" : "_self"}
            className="mt-auto inline-flex items-center justify-center px-3 py-2 rounded-lg
                       bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </article>
  );
}
