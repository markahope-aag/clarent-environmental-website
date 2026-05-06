import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      type: "number",
    }),
  ],
});
