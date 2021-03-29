import { memo } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkPost } from '../../graphql/post';
import PhotoIcon from '../../img/components/icons/PhotoIcon';
import optimizeImage from '../../lib/optimizeImage';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';

interface PostLinksProps {
  link_posts: Array<LinkPost>;
}

function PostLinks({ link_posts }: PostLinksProps) {
  if (!link_posts.length) return null;
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <div css={block(darkmode)}>
      <h3>다른 포스트 더 보기</h3>
      <div css={scrollBox}>
        {link_posts.map((v) => (
          <div css={postWrapper(darkmode)} key={`link_posts_${v.id}`}>
            <Link to={`/post/${v.url_slug}`}>
              {v.thumbnail ? (
                <img src={optimizeImage(v.thumbnail, 160)} />
              ) : (
                <PhotoIcon fill={palette.gray3} />
              )}
              <h4>{v.post_header}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const block = (darkmode: boolean) => css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 2rem 0;
  box-shadow: 1px 1px 10px 2px ${darkmode ? palette.gray9 : palette.gray3};
  h3 {
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const scrollBox = css`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
`;

const postWrapper = (darkmode: boolean) => css`
  display: flex;
  flex-direction: column;
  width: 10rem;
  height: 12.533125rem;
  padding: 0.5rem 1rem;
  margin: 1rem 1rem 1rem 0;
  img,
  svg {
    width: 10rem;
    height: 5rem;
  }
  background: ${darkmode ? darkmodeBackground.other : palette.gray0};
  &:hover {
    background: ${darkmode ? palette.gray9 : palette.gray1};
  }
`;

export default memo(PostLinks);
