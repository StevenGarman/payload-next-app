// src/app/collections/Pages.tsx
import { ContentBlock } from "@/blocks/ContentBlock";
import { HeroBlock } from "@/blocks/HeroBlocks";
import { NewFormBlock } from "@/blocks/NewFormBlock";
import type { CollectionConfig } from "payload";

const Pages: CollectionConfig = {
  slug: "pages",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true },

    {
      name: "layout",
      type: "blocks",
      required: true,
      blocks:[HeroBlock, ContentBlock, NewFormBlock]
    },
  ],
};

export default Pages;
