import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      type: "string",
    }),
    defineField({
      name: "industry",
      type: "string",
    }),
    defineField({
      name: "state",
      type: "string",
    }),
    defineField({
      name: "order",
      type: "number",
    }),
  ],
});
