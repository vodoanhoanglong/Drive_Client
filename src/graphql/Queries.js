import { gql } from '@apollo/client';

const getMyFiles = gql`
  query getMyFiles($path: String!) {
    files(where: { path: { _similar: $path } }) {
      id
      name
      path
      size
      extension
      url
    }
  }
`;

export const checkFileName = gql`
  query checkFileName($path: String!, $name: String!, $extension: String!) {
    check_file_name(args: { extension_input: $extension, name_input: $name, path_input: $path }) {
      name
    }
  }
`;

export const GET_FILE_SHARE = gql`
  query getFileShare {
    shares {
      fileId
      accountId
      account {
        fullName
      }
      file {
        name
        account {
          fullName
        }
      }
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GET_USER_BY_ID($ID: String!) {
    account(where: { id: { _eq: $ID } }) {
      id
      email
      fullName
      avatar_url
    }
  }
`;
const GET_USER_BY_EMAIL = gql`
  query GET_USER_BY_EMAIL($email: String!) {
    account(where: { email: { _eq: $email } }) {
      id
      fullName
      email
      avatar_url
    }
  }
`;

export { getMyFiles };
export { GET_USER_BY_ID, GET_USER_BY_EMAIL };
