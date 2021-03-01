import gql from 'graphql-tag';

export interface TagData {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  count: string;
}

export const GET_TAGS = gql`
  {
    tags {
      name
      count
    }
  }
`;
