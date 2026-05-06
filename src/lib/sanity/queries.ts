import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt,
    "featuredImage": featuredImage.asset->url
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, body, publishedAt, excerpt,
    "featuredImage": featuredImage.asset->url
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, slug, excerpt, wasteCategory, icon
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, author, company, industry, state
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id, question, answer, category
  }
`;
