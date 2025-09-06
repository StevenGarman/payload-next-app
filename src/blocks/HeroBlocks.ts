import { Block } from "payload";

export const HeroBlock: Block = {
    
          slug: "hero",
          labels: { singular: "Hero", plural: "Hero blocks" },
          fields: [
            { name: "heading", type: "text", required: true },
            { name: "subheading", type: "richText", required: true },
            {
              name: "image",
              type: "upload",
              relationTo: "media", 
              required: true,
            },
            {
              name: "cta_button",
              type: "group",
              label: "CTA button",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "url", type: "text", required: true },
              ],
            },
          ],
        }
