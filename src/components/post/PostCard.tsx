import { memo, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { PostData } from '../../graphql/post';
import optimizeImage from '../../lib/optimizeImage';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import PhotoIcon from '../../img/components/icons/PhotoIcon';
import markdownParser from '../../lib/remark/markdownParser';
import media from '../../lib/styles/media';

interface PostCardProps {
  post: PostData;
}

function PostCard({ post }: PostCardProps) {
  const { tag } = useParams<{ tag?: string }>();
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const previewDescription = useMemo(() => {
    return markdownParser(post.preview_description);
  }, [post.preview_description]);
  const previewTags = useMemo(() => {
    return tag ? post.tags.filter((v) => v === tag) : post.tags.slice(0, 2);
  }, [tag, post.tags]);

  return (
    <article css={block(darkmode)}>
      <div css={thumbnail}>
        <Link to={`/post/${post.url_slug}`}>
          {post.thumbnail ? (
            <img
              src={optimizeImage(post.thumbnail, 640)}
              alt="post-thumbnail"
            />
          ) : (
            <PhotoIcon fill={palette.gray3} />
          )}
        </Link>
      </div>
      <div css={content}>
        <Link to={`/post/${post.url_slug}`} style={{ padding: '1rem' }}>
          <h4 css={title}>{post.post_header}</h4>
          <p css={previewDescriptionStyle}>{previewDescription}</p>
        </Link>
      </div>
      <Link to={`/post/${post.url_slug}`}>
        <div css={footer(darkmode)}>
          <time dateTime={`${post.released_at}`}>
            {formatDate(post.released_at)}
          </time>
          <div className="post-card-tags">
            {previewTags.map((v) => (
              <p key={`${v}_${post.id}`}>{`#${v}`}</p>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

const block = (darkmode: boolean) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0.5rem;
  transition: transform 0.25s ease-in;
  p {
    margin: 0;
  }
  &:hover {
    cursor: pointer;
    ${media.medium} {
      transform: translateY(-0.5rem);
    }
  }
  ${darkmode
    ? css`
        box-shadow: 1px 1px 5px 2px ${palette.gray9};
      `
    : css`
        box-shadow: 1px 1px 5px 2px ${palette.gray1};
      `};
`;

const thumbnail = css`
  position: relative;
  width: 100%;
  padding-top: 52.19206680584551%;
  img,
  svg {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const content = css`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`;

const title = css`
  margin: 0.5rem 0 1rem 0;
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  word-break: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const previewDescriptionStyle = css`
  display: block;
  color: ${palette.gray6};
  height: 4rem;
  line-height: 1.5;
  font-size: 0.875rem;
  overflow: hidden;
  word-break: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const footer = (darkmode: boolean) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem;
  border-top: 1px solid ${darkmode ? palette.gray8 : palette.gray0};
  time,
  p {
    font-size: 0.8rem;
    color: ${palette.gray6};
  }
  .post-card-tags {
    display: flex;
    p + p {
      margin-left: 0.2rem;
    }
  }
`;

export default memo(PostCard);
