// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag';

export const MUTATION_KEYWORD = gql`
  mutation CreateKeyword($input: CreateKeywordMutationInput!) {
    createKeyword(input: $input)
      @rest(
        type: "Keyword"
        path: "/keyword/"
        method: "POST"
        bodyKey: "input"
      ) {
      ...keywordFields
    }
  }

  mutation DeleteKeyword($id: ID!) {
    deleteKeyword(id: $id)
      @rest(type: "NoContent", path: "/keyword/{args.id}/", method: "DELETE") {
      noContent
    }
  }

  mutation UpdateKeyword($input: UpdateKeywordMutationInput!) {
    updateKeyword(input: $input)
      @rest(
        type: "Keyword"
        path: "/keyword/{args.input.id}/"
        method: "PUT"
        bodyKey: "input"
      ) {
      ...keywordFields
    }
  }
`;
