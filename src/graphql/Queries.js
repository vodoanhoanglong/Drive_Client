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

export { getMyFiles };
