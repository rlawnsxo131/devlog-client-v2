import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { SeriesPostType } from '../../graphql/post';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';

type PostDetailSeriesProps = {
  series: Array<SeriesPostType>;
};

function PostDetailSeries({ series }: PostDetailSeriesProps) {
  if (!series.length) return null;
  const darkMode = useSelector(
    (state: RootState) => state.core.darkMode.darkMode,
  );
  return (
    <Block darkMode={darkMode}>
      <h3>시리즈 더보기</h3>
      <ContentWrapper>
        <h4>{series[0].series_name}</h4>
        {series.map((v) => (
          <Link
            key={`post_detail_series_${v.post_id}`}
            to={`/post/${v.url_slug}`}
            darkMode={darkMode}
          >
            {v.post_header}
          </Link>
        ))}
      </ContentWrapper>
    </Block>
  );
}

const Block = styled.div<{ darkMode: boolean }>`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 1px 1px 10px 2px
    ${(props) => (props.darkMode ? palette.gray9 : palette.gray3)};
  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Link = styled(NavLink)<{ darkMode: boolean }>`
  display: flex;
  flex-flow: row wrap;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${palette.indigo5};
  border-radius: 3px;
  &.active {
    box-shadow: 1px 1px 10px 2px
      ${(props) => (props.darkMode ? palette.gray9 : palette.gray3)};
  }
`;

export default PostDetailSeries;
