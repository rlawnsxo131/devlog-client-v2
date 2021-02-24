import gql from 'graphql-tag';

export interface Tag {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  count: string;
  __typename?: string;
}

export const GET_TAGS = gql`
  {
    tags {
      name
      count
    }
  }
`;
