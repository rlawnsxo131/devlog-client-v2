import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import media from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';

interface DefaultTagProps {
  name: string;
}

function DefaultTag({ name }: DefaultTagProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <Link css={block(darkmode)} to={`/posts/${name}`}>
      <span>#{name}</span>
    </Link>
  );
}

const block = (darkmode: boolean) => css`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin-bottom: 0.1rem;
  color: ${palette.gray9};
  font-weight: 600;
  background: ${darkmode ? palette.gray8 : palette.gray1};
  border-radius: 1rem;
  &:hover {
    background: ${darkmode ? palette.gray7 : palette.gray0};
  }
  & + & {
    margin-left: 0.5rem;
  }
  ${media.xsmall} {
    font-size: 0.9rem;
  }
  ${media.small} {
    font-size: 1rem;
  }
`;

export default DefaultTag;
