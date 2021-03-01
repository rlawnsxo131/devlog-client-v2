import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GET_POST, PostData } from '../../graphql/post';
import useError from '../../lib/hooks/useError';
import useNotFound from '../../lib/hooks/useNotFound';
import optimizeImage from '../../lib/optimizeImage';
import media from '../../lib/styles/media';
import { formatDate } from '../../lib/utils';
import Comments from '../comment/Comments';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';
import MarkdownRender from '../markdown/MarkdownRender';
import DefaultTags from '../tag/DefaultTags';
import PostSeries from './PostSeries';
import PostSkelleton from './PostSkelleton';
import PostToc from './PostToc';
import { useEffect, useMemo } from 'react';
import markdownParser from '../../lib/remark/markdownParser';

interface PostProps {}

function Post(props: PostProps) {
  const [setNotFound] = useNotFound();
  const [handleError] = useError();
  const { url_slug }: { url_slug: string } = useParams();
  const { loading, error, data } = useQuery<
    { post: PostData },
    { url_slug: string }
  >(GET_POST, {
    variables: {
      url_slug,
    },
    // fetchPolicy: 'cache-and-network'
  });

  const description = useMemo(() => {
    if (!data) return '';
    return `${markdownParser(data.post.preview_description)}...`;
  }, [data?.post.preview_description]);

  const thumnail = useMemo(() => {
    if (!data) return '';
    return data.post.thumnail
      ? optimizeImage(data.post.thumnail, 800)
      : `${process.env.REACT_APP_IMAGE_URL}/logo/devlog.png`;
  }, [data?.post.thumnail]);

  useEffect(() => {
    globalThis.scrollTo(0, 0);
  }, [url_slug]);

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <PostSkelleton />;
  if (error) return null;
  if (!data || !data.post) {
    setNotFound();
    return null;
  }

  return (
    <MediaRatioWrapper type="column">
      <Helmet>
        <title>{data.post.post_header}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={data.post.post_header} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={thumnail} />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SERVICE_URL}/post/${data.post.url_slug}`}
        />
        <link
          rel="canonical"
          href={`${process.env.REACT_APP_SERVICE_URL}/post/${data.post.url_slug}`}
        />
      </Helmet>
      <PostHeader>{data.post.post_header}</PostHeader>
      <PostInfo>
        <div className="writer">By John</div>
        <span className="separator">&middot;</span>
        <p>{formatDate(data.post.released_at)}</p>
      </PostInfo>
      <Tags>
        <DefaultTags tags={data.post.tags} />
      </Tags>
      {data.post.thumnail && (
        <Thumnail>
          <img
            src={optimizeImage(data.post.thumnail, 768)}
            alt="post-thumnail"
          />
        </Thumnail>
      )}
      <MarkdownRender markdownText={data.post.post_body} />
      <PostSeries series={data.post.series_posts} />
      <Comments post_id={data.post.id} />
      <PostToc post_body={data.post.post_body} />
    </MediaRatioWrapper>
  );
}

const PostHeader = styled.h1`
  ${media.xsmall} {
    font-size: 1.825rem;
  }
  ${media.small} {
    font-size: 2rem;
  }
  ${media.medium} {
    font-size: 2.25rem;
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 1.125rem;
  .writer {
    font-weight: bold;
  }
  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-weight: bold;
  }
  ${media.xsmall} {
    font-size: 1rem;
  }
  ${media.small} {
    font-size: 1.125rem;
  }
`;

const Tags = styled.div`
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

export default Post;
