import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Regulatory", value: "regulatory" },
          { title: "Pricing", value: "pricing" },
          { title: "Process", value: "process" },
          { title: "Compliance", value: "compliance" },
        ],
      },
    }),
    defineField({
      name: "order",
      type: "number",
    }),
  ],
});
