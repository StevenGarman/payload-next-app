// src/app/collections/Media.ts
import type { CollectionConfig } from "payload";

const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticURL: "/media",
    staticDir: "media",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "alt", type: "text" },
  ],
};

export default Media;
