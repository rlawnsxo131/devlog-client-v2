import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { PostType } from '../../graphql/post';
import optimizeImage from '../../lib/optimizeImage';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import stringify from 'rehype-stringify';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

type PostCardProps = {
  post: PostType;
};

const { useMemo, memo } = React;
function PostCard({ post }: PostCardProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const previewDescription = useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(remark2rehype, { allowDangerousHtml: false })
      .use(raw)
      .use(stringify)
      .processSync(post.preview_description)
      .toString()
      .replace(/(<([^>]+)>)/gi, '');
  }, [post.preview_description]);

  const tags = useMemo(() => {
    return post.tags.slice(0, 3);
  }, [post.tags]);

  return (
    <Block darkmode={darkmode}>
      {post.thumnail && (
        <Thumnail>
          <Link to={`/post/${post.url_slug}`}>
            <img src={optimizeImage(post.thumnail, 640)} alt="post-thumnail" />
          </Link>
        </Thumnail>
      )}
      <Link to={`/post/${post.url_slug}`}>
        <Content>
          <Title>{post.post_header}</Title>
          <ShortDescription>{post.short_description}</ShortDescription>
          <PreviewDescription>{previewDescription}</PreviewDescription>
        </Content>
        <Footer darkmode={darkmode}>
          <p>
            {formatDate(post.released_at)}
            <span className="separator">&middot;</span>
            {post.comments_count}개의 댓글
          </p>
          <div className="post-card-tags">
            {tags.map((v, i) => (
              <p key={`post_card_tag_${v}_${i}`}>{`#${v}`}</p>
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
  p,
  h5 {
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Title = styled.h5`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  overflow: hidden;
  word-break: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ShortDescription = styled.h4`
  font-size: 0.9rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
`;

const PreviewDescription = styled.p`
  color: ${palette.gray6};
  font-size: 0.875rem;
  line-height: 1.6;
  height: 4rem;
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
    .separator {
      font-size: 0.8rem;
      color: ${palette.gray6};
      font-weight: bold;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
    }
  }
  .post-card-tags {
    display: flex;
    p + p {
      margin-right: 0.2rem;
    }
  }
`;

export default memo(PostCard);
