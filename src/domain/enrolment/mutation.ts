// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag';

export const MUTATION_ENROLMENT = gql`
  mutation CreateEnrolment(
    $input: CreateEnrolmentMutationInput!
    $registration: String!
  ) {
    createEnrolment(input: $input, registration: $registration)
      @rest(
        type: "CreateEnrolmentResponse"
        path: "/registration/{args.registration}/signup/"
        method: "POST"
        bodyKey: "input"
      ) {
      ...createEnrolmentFields
    }
  }

  mutation DeleteEnrolment($cancellationCode: String!) {
    deleteEnrolment(cancellationCode: $cancellationCode)
      @rest(
        type: "NoContent"
        path: "/signup/{args.cancellationCode}"
        method: "DELETE"
      ) {
      noContent
    }
  }

  mutation UpdateEnrolment($input: UpdateEnrolmentMutationInput!) {
    updateEnrolment(input: $input)
      @rest(
        type: "Enrolment"
        path: "/signup_edit/{args.input.id}/"
        method: "PUT"
        bodyKey: "input"
      ) {
      ...enrolmentFields
    }
  }
`;
