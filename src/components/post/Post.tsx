import { css } from '@emotion/react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { GET_POST, PostData } from '../../graphql/post';
import useError from '../../lib/hooks/useError';
import optimizeImage from '../../lib/optimizeImage';
import media from '../../lib/styles/media';
import { formatDate } from '../../lib/utils';
import Comments from '../comment/Comments';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';
import MarkdownRender from '../markdown/MarkdownRender';
import DefaultTags from '../tag/DefaultTags';
import PostSeries from './PostSeries';
import PostSkeleton from './PostSkeleton';
import PostToc from './PostToc';
import { useEffect, useMemo } from 'react';
import markdownParser from '../../lib/remark/markdownParser';
import useNotFound from '../../lib/hooks/useNotFound';
import PostLinks from './PostLinks';

interface PostProps {}

function Post(props: PostProps) {
  const [handleError] = useError();
  const [setNotFound] = useNotFound();
  const { url_slug }: { url_slug: string } = useParams();
  const { loading, error, data } = useQuery<
    { post: PostData },
    { url_slug: string }
  >(GET_POST, {
    variables: {
      url_slug,
    },
    onError: (error) => {
      handleError(error);
    },
  });

  const description = useMemo(() => {
    if (!data) return '';
    return `${markdownParser(data.post.preview_description)}`;
  }, [data?.post.preview_description]);

  const thumbnail = useMemo(() => {
    if (!data) return '';
    return data.post.thumbnail
      ? optimizeImage(data.post.thumbnail, 800)
      : `${process.env.REACT_APP_IMAGE_URL}/logo/devlog.png`;
  }, [data?.post.thumbnail]);

  useEffect(() => {
    globalThis.scrollTo(0, 0);
  }, [url_slug]);

  if (loading) return <PostSkeleton />;
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
        <meta property="og:image" content={thumbnail} />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SERVICE_URL}/post/${data.post.url_slug}`}
        />
        <link
          rel="canonical"
          href={`${process.env.REACT_APP_SERVICE_URL}/post/${data.post.url_slug}`}
        />
      </Helmet>
      <article css={block}>
        <h1 css={header}>{data.post.post_header}</h1>
        <div css={info}>
          <div className="writer">By John</div>
          <span className="separator">&middot;</span>
          <time dateTime={`${data.post.released_at}`}>
            {formatDate(data.post.released_at)}
          </time>
        </div>
        <div css={tags}>
          <DefaultTags tags={data.post.tags} />
        </div>
        {data.post.thumbnail && (
          <div css={thumbnailStyle}>
            <img
              src={optimizeImage(data.post.thumbnail, 768)}
              alt="post-thumbnail"
            />
          </div>
        )}
        <MarkdownRender markdownText={data.post.post_body} />
        <PostSeries series={data.post.series_posts} />
        <PostLinks link_posts={data.post.link_posts} />
        <Comments post_id={data.post.id} />
        <PostToc />
      </article>
    </MediaRatioWrapper>
  );
}

const block = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const header = css`
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

const info = css`
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

const tags = css`
  margin-bottom: 1.125rem;
`;

const thumbnailStyle = css`
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
