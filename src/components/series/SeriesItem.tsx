import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { SeriesType } from '../../graphql/series';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';

type SeriesItemProps = {
  series: SeriesType;
};

const { useMemo } = React;
function SeriesItem({ series }: SeriesItemProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const shadowcolor = useMemo(
    () => (darkmode ? palette.gray9 : palette.gray3),
    [darkmode],
  );
  return (
    <Block darkmode={darkmode}>
      <Title>{series.series_name}</Title>
      {series.posts.map((v) => (
        <Link
          key={`seires_posts_${v.url_slug}`}
          to={`/post/${v.url_slug}`}
          shadowcolor={shadowcolor}
        >
          {v.post_header}
        </Link>
      ))}
    </Block>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 1px 1px 10px 2px
    ${(props) => (props.darkmode ? palette.gray9 : palette.gray3)};
`;

const Title = styled.h3`
  font-weight: 550;
  margin: 0 0 0.5rem 0;
`;

const Link = styled(NavLink)<{ shadowcolor: string }>`
  margin-left: 1rem;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${palette.indigo5};
  border-radius: 3px;
  &:hover {
    box-shadow: 1px 1px 10px 2px ${(props) => props.shadowcolor};
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

export default SeriesItem;
