import { GraphQLClient } from "graphql-request";
import { getGraphQLEndpoint } from "../../lib/getGraphqlEndpoint";

export const client = new GraphQLClient(getGraphQLEndpoint() ?? "");
