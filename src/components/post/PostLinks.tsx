import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    <Block darkmode={darkmode}>
      <h3>다른 포스트 더 보기</h3>
      <ScrollBox>
        {link_posts.map((v) => (
          <PostWrapper key={`link_posts_${v.id}`} darkmode={darkmode}>
            <Link to={`/post/${v.url_slug}`}>
              {v.thumnail ? (
                <img src={optimizeImage(v.thumnail, 160)} />
              ) : (
                <PhotoIcon fill={palette.gray3} />
              )}
              <h4>{v.post_header}</h4>
            </Link>
          </PostWrapper>
        ))}
      </ScrollBox>
    </Block>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 2rem 0;
  margin-bottom: 1.125rem;
  box-shadow: 1px 1px 10px 2px
    ${(props) => (props.darkmode ? palette.gray9 : palette.gray3)};
  h3 {
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const ScrollBox = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
`;

const PostWrapper = styled.div<{ darkmode: boolean }>`
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
  background: ${(props) =>
    props.darkmode ? darkmodeBackground.other : palette.gray0};
  &:hover {
    background: ${(props) => (props.darkmode ? palette.gray9 : palette.gray1)};
  }
`;

export default memo(PostLinks);
