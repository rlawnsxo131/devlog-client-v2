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

function SeriesItem({ series }: SeriesItemProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <Block darkmode={darkmode}>
      <Title>{series.series_name}</Title>
      {series.posts.map((v, i) => (
        <Link key={`seires_posts_${i}`} to={`/post/${v.url_slug}`}>
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

const Link = styled(NavLink)`
  margin-left: 1rem;
  font-weight: 600;
  color: ${palette.indigo5};
  text-decoration: none;
  &:hover {
    color: ${palette.indigo4};
    text-decoration: underline;
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

export default SeriesItem;
