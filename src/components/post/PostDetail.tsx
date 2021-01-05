import { useQuery } from '@apollo/client';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GET_POST, PostType } from '../../graphql/post';
import optimizeImage from '../../lib/optimizeImage';
import media, { mediaQuery } from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import Comments from '../comment/Comments';
import MarkdownRender from '../markdown/MarkdownRender';
import DefaultTags from '../tag/DefaultTags';
import PostDetailSeries from './PostDetailSeries';

type PostDetailProps = {};

const { useEffect } = React;
function PostDetail(props: PostDetailProps) {
  const { url_slug }: { url_slug: string } = useParams();
  if (!url_slug) return <div>not found</div>;
  const { loading, error, data } = useQuery<{ post: PostType }>(GET_POST, {
    variables: {
      url_slug,
    },
    // fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    globalThis.scrollTo(0, 0);
  }, [url_slug]);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>not found</div>;

  return (
    <Block>
      <PostHeader>{data.post.post_header}</PostHeader>
      <PostInfo>
        <ShortDescription>{data.post.short_description}</ShortDescription>
        <span className="separator">&middot;</span>
        <ReleasedAt>{formatDate(data.post.released_at)}</ReleasedAt>
      </PostInfo>
      <TagsWrapper>
        <DefaultTags tags={data.post.tags} />
      </TagsWrapper>
      {data.post.thumnail && (
        <Thumnail>
          <img
            src={optimizeImage(data.post.thumnail, 768)}
            alt="post-thumnail"
          />
        </Thumnail>
      )}
      <MarkdownRender markdownText={data.post.post_body} />
      <PostDetailSeries series={data.post.series_posts} />
      <Comments post_id={data.post.id} />
    </Block>
  );
}

const Block = styled.div`
  flex-direction: column;
  ${media.xsmall} {
    width: calc(100vw - 2rem);
  }
  ${media.small} {
    width: 736px;
  }
  ${mediaQuery(800)} {
    width: 768px;
  }
`;

const PostHeader = styled.h1`
  ${media.xsmall} {
    font-size: 2.725rem;
  }
  ${media.small} {
    font-size: 3.25rem;
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.125rem;
  ${media.xsmall} {
    font-size: 1rem;
  }
  ${media.small} {
    font-size: 1.125rem;
  }
`;

const ShortDescription = styled.div`
  font-weight: bold;
`;

const ReleasedAt = styled.div`
  display: flex;
  color: ${palette.gray6};
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1.125rem;
`;

const Thumnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
  }
`;

export default PostDetail;
