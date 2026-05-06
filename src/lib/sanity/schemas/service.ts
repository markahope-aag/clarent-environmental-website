import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "wasteCategory",
      type: "string",
      options: {
        list: [
          { title: "RCRA Hazardous", value: "rcra_hazardous" },
          { title: "Universal Waste", value: "universal_waste" },
          { title: "Used Oil", value: "used_oil" },
          { title: "Conditional Exclusion", value: "conditional_exclusion" },
        ],
      },
    }),
    defineField({
      name: "icon",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "order",
      type: "number",
    }),
  ],
});
