import { gql } from '@apollo/client';

const loginMutation = gql`
  mutation loginMutation {
    login(data: { email: "test1@tesst1.com", password: "test" }) {
      access_token
      expires_in
      refresh_token
    }
  }
`;

const registerMutation = gql`
  mutation registerMutation {
    createAccount(data: { email: "test1@tesst1.com", password: "test", role: "user" }) {
      id
    }
  }
`;

export const uploadFile = gql`
  mutation uploadFile(
    $name: String!
    $path: String!
    $size: Int!
    $url: String!
    $extension: String!
  ) {
    uploadFile(data: { extension: $extension, name: $name, size: $size, url: $url, path: $path }) {
      id
      url
      name
      path
      extension
      size
      accountId
    }
  }
`;

export const updateFileUrl = gql`
  mutation updateFileUrl($id: String!, $url: String!) {
    update_files_by_pk(pk_columns: { id: $id }, _set: { url: $url }) {
      url
    }
  }
`;

export const deleteFile = gql`
  mutation MyMutation($id: String!) {
    update_files_by_pk(pk_columns: { id: $id }, _set: { status: 1 }) {
      id
    }
  }
`;

export { loginMutation, registerMutation };
