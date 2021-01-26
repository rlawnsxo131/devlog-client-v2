import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { TagType } from '../../graphql/tag';
import media from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';

type CountTagProps = {
  tag: TagType;
};

const { useMemo, memo } = React;
function CountTag({ tag }: CountTagProps) {
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
    <>
      <CountLink
        background={background}
        hoverbackground={hoverbackground}
        to={`/posts/${tag.name}`}
      >
        <span>#{tag.name}</span>
        <Count>
          <span>{tag.count}</span>
        </Count>
      </CountLink>
    </>
  );
}

const CountLink = styled(NavLink)<{
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

const Count = styled.div`
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
