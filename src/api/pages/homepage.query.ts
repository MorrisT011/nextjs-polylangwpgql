import { gql } from "../../../generated";
import { client } from "../api";

export const GET_HOME = gql(`
query Page($id: ID!) {
  page(id: $id, idType: URI) {
    title
    uri
    author {
      node {
        firstName
        lastName
      }
    }
  }
}
`);

export const getHome = async () => {
  return await client.request(GET_HOME, { id: "startpagina" });
};
