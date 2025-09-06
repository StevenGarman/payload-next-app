import { Block } from "payload";

export const ContentBlock: Block = {
  slug: "content",
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
    },
    {
      name: "subheading",
      type: "text",
      required: false,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media", // this must match your Media collection slug
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "cta",
      type: "group",
      label: "Button",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
