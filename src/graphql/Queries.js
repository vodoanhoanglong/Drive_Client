const { gql } = require('@apollo/client');

const GET_USER_BY_ID = gql`
  query getAccountInfo($ID: String!) {
    account(where: { id: { _eq: $ID } }) {
      id
      email
      fullName
      avatar_url
    }
  }
`;
const GET_USER_BY_EMAIL = gql`
  query getAccountInfo($email: String!) {
    account(where: { email: { _eq: $email } }) {
      id
      fullName
      email
      avatar_url
    }
  }
`;

export { GET_USER_BY_ID, GET_USER_BY_EMAIL };
