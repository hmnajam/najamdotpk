import { defineField, defineType } from "sanity";

export default defineType({
  name: "certificates",
  title: "Certificates",
  type: "document",
  fields: [
    defineField({
      name: "course",
      title: "Course Name",
      type: "string",
    }),
    defineField({
      name: "creator",
      title: "Course Creator",
      type: "string",
    }),
    defineField({
      name: "issuer",
      title: "Certificate Issuer",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Upload Certificate",
      type: "image",
    }),
    defineField({
      name: "link",
      title: "Verification Link",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Certificate Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
