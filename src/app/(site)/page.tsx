// app/page.tsx
import { getPayload } from "payload";
import config from "@/payload.config";
import type { Page as PageType } from "@/payload-types";

import HeroBlock from "@/components/HeroBlock";
import ContentBlock from "@/components/ContentBlock"; // <- blocks path
import BlocksCarousel from "@/components/BlocksCarousel"; // <- carousel using ContentBlock
import NewFormBlock from "@/components/NewForm"; // <- keep names/paths consistent
import Team from "@/components/teaminfo/Team";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: "tests-2-2" } }, // <- your slug
    depth: 2,
    limit: 1,
  });

  const page = docs?.[0] as PageType | undefined;
  if (!page) return <div className="p-6">Page not found</div>;

  // Split blocks by type
  const layout = page.layout ?? [];
  const heroBlocks = layout.filter((b) => b.blockType === "hero") as PageType["layout"];
  const contentBlocks = layout.filter((b) => b.blockType === "content") as PageType["layout"];
  const formBlocks = layout.filter((b) => b.blockType === "newform") as PageType["layout"];
  const unknownBlocks = layout.filter(
    (b) => !["hero", "content", "newform"].includes(String((b as any).blockType))
  );

  return (
    <>
      {/* Heroes */}
      {heroBlocks.map((b: any) => (
        <HeroBlock key={b.id} block={b} />
      ))}

      {/* Content carousel (compact cards) */}
      {contentBlocks.length > 0 && (
        <BlocksCarousel blocks={contentBlocks as any} />
        // If you want a grid instead of carousel, use:
        // <section className="bg-gray-50 py-10">
        //   <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        //     {contentBlocks.map((b: any) => <ContentBlock key={b.id} block={b} />)}
        //   </div>
        // </section>
      )}

      {/* Forms */}
      {formBlocks.map((b: any) => (
        <NewFormBlock key={b.id} block={b} />
      ))}

      {/* Any unknown blocks (debug) */}
      {unknownBlocks.map((b: any) => (
        <pre key={b.id} className="text-xs bg-gray-50 p-4 rounded border overflow-auto">
          Unknown block type: {String(b.blockType)}
          {"\n"}
          {JSON.stringify(b, null, 2)}
        </pre>
      ))}

      <Team />
    </>
  );
}
