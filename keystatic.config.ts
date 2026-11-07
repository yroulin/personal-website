import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  collections: {
    posts: collection({
      label: "Articles",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
        description: fields.text({ label: "Description", multiline: true, validation: { isRequired: true } }),
        published: fields.checkbox({ label: "Published", defaultValue: false, description: "Enable when ready to publish, then commit and push. Drafts are hidden from the blog." }),
        date: fields.date({ label: "Article date", validation: { isRequired: true }, description: "Displayed on the article. This does not schedule publication." }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (props) => props.value }),
        coverImage: fields.image({ label: "Cover image", directory: "public/images/blog", publicPath: "/images/blog/" }),
        coverImageAlt: fields.text({ label: "Cover image description", description: "Describe the image for readers using a screen reader. Leave empty only for decorative images." }),
        content: fields.markdoc({ label: "Article", options: { image: { directory: "public/images/blog", publicPath: "/images/blog/" } } }),
      },
    }),
  },
});
