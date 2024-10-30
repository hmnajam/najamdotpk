import { defineField, defineType } from "sanity";

export default defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "project",
      title: "Project Name",
      type: "string",
    }),
    defineField({
      name: "project_link",
      title: "Project Link",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Display Image",
      type: "image",
    }),
    defineField({
      name: "block",
      title: "Project Description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
  ],
});
