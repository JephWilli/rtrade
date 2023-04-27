import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: "xuc10hn7",
    dataset: "production",
    apiVersion: "2023-02-22",
    useCdn: true
  });

  const builder = imageUrlBuilder(client);

  export const urlFor = (source) => builder.image(source);