import { memo, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Post } from '../../graphql/post';
import optimizeImage from '../../lib/optimizeImage';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import PhotoIcon from '../../img/components/icons/PhotoIcon';
import markdownParser from '../../lib/remark/markdownParser';

interface PostCardProps {
  post: Post;
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
    <Block darkmode={darkmode}>
      <Thumnail>
        <Link to={`/post/${post.url_slug}`}>
          {post.thumnail ? (
            <img src={optimizeImage(post.thumnail, 640)} alt="post-thumnail" />
          ) : (
            <PhotoIcon fill={palette.gray3} />
          )}
        </Link>
      </Thumnail>
      <Content>
        <Link to={`/post/${post.url_slug}`} style={{ padding: '1rem' }}>
          <Title>{post.post_header}</Title>
          <PreviewDescription>{previewDescription}</PreviewDescription>
        </Link>
      </Content>
      <Link to={`/post/${post.url_slug}`}>
        <Footer darkmode={darkmode}>
          <p>{formatDate(post.released_at)}</p>
          <div className="post-card-tags">
            {previewTags.map((v) => (
              <p key={`${v}_${post.id}`}>{`#${v}`}</p>
            ))}
          </div>
        </Footer>
      </Link>
    </Block>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  p {
    margin: 0;
  }
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.darkmode
      ? css`
          box-shadow: 1px 1px 5px 2px ${palette.gray9};
          &:hover {
            box-shadow: 1px 1px 10px 2px ${palette.gray8};
          }
        `
      : css`
          box-shadow: 1px 1px 5px 2px ${palette.gray1};
          &:hover {
            box-shadow: 1px 1px 10px 2px ${palette.gray5};
          }
        `};
`;

const Thumnail = styled.div`
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

const Content = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
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

const PreviewDescription = styled.p`
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

const Footer = styled.div<{ darkmode: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid
    ${(props) => (props.darkmode ? palette.gray9 : palette.gray1)};
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
