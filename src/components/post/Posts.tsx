import { useEffect } from 'react';
import { css } from '@emotion/react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { GET_POSTS, PostData } from '../../graphql/post';
import useError from '../../lib/hooks/useError';
import PostCard from './PostCard';
import PostsSkeleton from './PostsSkeleton';
import PostCardGridLayout from './PostCardGridLayout';

interface PostsProps {}

function Posts(props: PostsProps) {
  const [handleError] = useError();
  const { tag } = useParams<{ tag?: string }>();
  const { loading, error, data } = useQuery<
    { posts: Array<PostData> },
    { tag?: string }
  >(GET_POSTS, {
    variables: {
      tag,
    },
  });

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <PostsSkeleton />;
  if (error) return null;

  return (
    <div css={block}>
      <Helmet>
        <title>{`${tag ? `${tag} - ` : ''}DevLog`}</title>
        <meta
          name="description"
          content={`김준태 블로그(DevLog) - ${data?.posts
            .map((post) => post.post_header)
            .slice(0, 20)
            .join()}`}
        />
        <meta
          property="og:description"
          content={tag ? `${tag}에 관한 글목록` : ''}
        />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SERVICE_URL}${
            tag ? `/posts/${tag}` : ''
          }`}
        />
        <link
          rel="canonical"
          href={`${process.env.REACT_APP_SERVICE_URL}${
            tag ? `/posts/${tag}` : ''
          }`}
        />
      </Helmet>
      {tag && <h3>#{tag}</h3>}
      <PostCardGridLayout>
        {data?.posts.map((post) => (
          <PostCard key={`post_${post.id}`} post={post} />
        ))}
      </PostCardGridLayout>
    </div>
  );
}

const block = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  h3 {
    font-weight: 600;
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export default Posts;
