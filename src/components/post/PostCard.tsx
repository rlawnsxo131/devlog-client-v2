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
  const darkMode = useSelector(
    (state: RootState) => state.core.darkMode.darkMode,
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

  return (
    <Block darkMode={darkMode}>
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
        <Footer darkMode={darkMode}>
          <div className="post-card-tags">
            {post.tags.map((v, i) => (
              <p key={`post_card_tag_${v}_${i}`}>{`#${v}`}</p>
            ))}
          </div>
          <p>{formatDate(post.released_at)}</p>
        </Footer>
      </Link>
    </Block>
  );
}

const Block = styled.div<{ darkMode: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  p,
  h5 {
    margin: 0;
  }
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.darkMode
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
  flex: 1 1 80%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: hidden;
`;

const Title = styled.h5`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ShortDescription = styled.h4`
  font-size: 0.9rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
`;

const PreviewDescription = styled.p`
  color: ${palette.gray6};
  font-size: 0.875rem;
  line-height: 1.5;
  height: 4rem;
  word-break: break-word;
  overflow-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Footer = styled.div<{ darkMode: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid
    ${(props) => (props.darkMode ? palette.gray9 : palette.gray1)};
  p {
    font-size: 0.8rem;
    color: ${palette.gray6};
  }
`;

export default memo(PostCard);
