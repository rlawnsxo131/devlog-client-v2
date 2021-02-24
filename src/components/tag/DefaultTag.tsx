import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
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
  const background = useMemo(() => {
    return darkmode ? palette.gray8 : palette.gray1;
  }, [darkmode]);
  const hoverbackground = useMemo(() => {
    return darkmode ? palette.gray7 : palette.gray0;
  }, [darkmode]);
  return (
    <Block
      background={background}
      hoverbackground={hoverbackground}
      to={`/posts/${name}`}
    >
      <span>#{name}</span>
    </Block>
  );
}

const Block = styled(NavLink)<{
  background: string;
  hoverbackground: string;
}>`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  margin-bottom: 0.1rem;
  color: ${palette.gray9};
  font-weight: 600;
  background: ${(props) => props.background};
  border-radius: 1rem;
  &:hover {
    background: ${(props) => props.hoverbackground};
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
