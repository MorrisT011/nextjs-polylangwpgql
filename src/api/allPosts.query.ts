import { gql } from "../../generated";
import { LanguageCodeFilterEnum } from "../../generated/graphql";
import { client } from "./api";

export const GET_ALL_POSTS = gql(`
query posts($language: LanguageCodeFilterEnum!) {
  posts(where: {language: $language}) {
    nodes {
      id
      excerpt
      title
      slug
      language {
        code
        locale
      }
    }
  }
  generalSettings {
    title
    description
  }
}
    `);


export const getAllPosts = async (language: LanguageCodeFilterEnum) => {
    return await client.request(GET_ALL_POSTS, {language: language});
};