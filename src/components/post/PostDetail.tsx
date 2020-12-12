import { useQuery } from '@apollo/client';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GET_POST, PostType } from '../../graphql/post';
import media from '../../lib/styles/media';
import MarkdownRender from '../markdown/MarkdownRender';

type PostDetailProps = {};

function PostDetail(props: PostDetailProps) {
  const { url_slug }: { url_slug: string } = useParams();
  if (!url_slug) return <div>not found</div>;
  const { loading, error, data } = useQuery<{ post: PostType }>(GET_POST, {
    variables: {
      url_slug,
    },
    // fetchPolicy: 'cache-and-network'
  });

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <Block>
      <MarkdownRender markdownText={data?.post.post_body} />
    </Block>
  );
}

const Block = styled.div`
  flex: 1 1 0%;
  width: 768px;
  ${media.xsmall} {
    width: calc(100vw - 2rem);
  }
  ${media.small} {
    width: 768px;
  }
  /* border: 1px solid black; */
`;

export default PostDetail;
