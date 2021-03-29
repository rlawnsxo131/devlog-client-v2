import { memo } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TagData } from '../../graphql/tag';
import media from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';

interface CountTagProps {
  tag: TagData;
}

function CountTag({ tag }: CountTagProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <Link css={link(darkmode)} to={`/posts/${tag.name}`}>
      <span>#{tag.name}</span>
      <div css={count}>
        <span>{tag.count}</span>
      </div>
    </Link>
  );
}

const link = (darkmode: boolean) => css`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${palette.gray9};
  font-weight: 600;
  background: ${darkmode ? palette.gray8 : palette.gray1};
  border-radius: 1rem;
  &:hover {
    background: ${darkmode ? palette.gray7 : palette.gray0};
  }
  ${media.xsmall} {
    font-size: 0.9rem;
  }
  ${media.small} {
    font-size: 1rem;
  }
`;

const count = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.3rem;
  font-weight: bold;
  font-size: 0.95rem;
  span {
    color: ${palette.gray0};
  }
  background: ${palette.indigo4};
`;

export default memo(CountTag);
