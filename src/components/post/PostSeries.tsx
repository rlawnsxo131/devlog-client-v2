import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { SeriesPostData } from '../../graphql/post';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';

interface PostSeriesProps {
  series: Array<SeriesPostData>;
}

function PostSeries({ series }: PostSeriesProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const shadowcolor = useMemo(
    () => (darkmode ? palette.gray9 : palette.gray3),
    [darkmode],
  );
  if (!series.length) return null;
  return (
    <Block darkmode={darkmode}>
      <h3>이 시리즈 더보기</h3>
      <ContentWrapper>
        <h4>{series[0].series_name}</h4>
        {series.map((v) => (
          <Link
            key={`post_detail_series_${v.post_id}`}
            to={`/post/${v.url_slug}`}
            shadowcolor={shadowcolor}
          >
            {v.post_header}
          </Link>
        ))}
      </ContentWrapper>
    </Block>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 1px 1px 10px 2px
    ${(props) => (props.darkmode ? palette.gray9 : palette.gray3)};
  h3 {
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  h4 {
    font-weight: 500;
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

const Link = styled(NavLink)<{ shadowcolor: string }>`
  display: flex;
  flex-flow: row wrap;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${palette.indigo5};
  border-radius: 3px;
  &:hover {
    box-shadow: 1px 1px 10px 2px ${(props) => props.shadowcolor};
  }
  &.active {
    box-shadow: 1px 1px 10px 2px ${(props) => props.shadowcolor};
  }
`;

export default memo(PostSeries);
