import { Block } from "payload";

export const NewFormBlock: Block = {
    slug: 'newform',
    fields: [
       {
        name: 'heading',
        type: 'text',
        required: false,
    },
    {
        name: 'form',
        type: 'relationship',
        relationTo: 'forms',
        required: true,
    },
    ]
}