import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonials",
  title: "Testimonials", // Corrected typo here
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "designation",
      title: "Designation",
      type: "string",
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
    }),
    defineField({
      name: "profile_link", // Corrected typo here
      title: "Profile Link",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Display Image",
      type: "image",
    }),
    defineField({
      name: "block",
      title: "What they say",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
  ],
});
