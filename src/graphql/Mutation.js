import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      access_token
      expires_in
      refresh_token
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CREATE_ACCOUNT($email: String!, $password: String!, $displayName: String!) {
    createAccount(
      data: { email: $email, password: $password, fullName: $displayName, role: "user" }
    ) {
      id
      access_token
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

export const SHARE_FILE = gql`
  mutation shareFile($fileId: String!, $shareToUserId: String!) {
    insert_shares_one(object: { fileId: $fileId, accountId: $shareToUserId }) {
      fileId
      accountId
    }
  }
`;

export const updateFileUrl = gql`
  mutation updateFileUrl($id: String!, $url: String!) {
    update_files_by_pk(pk_columns: { id: $id }, _set: { url: $url }) {
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

export const deleteFile = gql`
  mutation MyMutation($id: String!) {
    update_files_by_pk(pk_columns: { id: $id }, _set: { status: 1 }) {
      id
    }
  }
`;
