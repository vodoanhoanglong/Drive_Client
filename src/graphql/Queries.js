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

export { getMyFiles };
