import { gql } from '@apollo/client';

const LOGIN_BY_ACCOUNT = gql`
  mutation loginByAccount($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      access_token
      expires_in
      refresh_token
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation CREATE_ACCOUNT($email: String!, $password: String!, $displayName: String!) {
    createAccount(
      data: { email: $email, password: $password, fullName: $displayName, role: "user" }
    ) {
      id
      access_token
    }
  }
`;

export { LOGIN_BY_ACCOUNT, CREATE_ACCOUNT };
