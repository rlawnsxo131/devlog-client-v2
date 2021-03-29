import { memo } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { SeriesPostData } from '../../graphql/post';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import { NavLink } from 'react-router-dom';

interface PostSeriesProps {
  series: Array<SeriesPostData>;
}

function PostSeries({ series }: PostSeriesProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  if (!series.length) return null;
  return (
    <div css={block(darkmode)}>
      <h3>이 시리즈 더보기</h3>
      <div css={content}>
        <h4>{series[0].series_name}</h4>
        {series.map((v) => (
          <NavLink
            key={`post_detail_series_${v.post_id}`}
            to={`/post/${v.url_slug}`}
            css={link(darkmode)}
          >
            {v.post_header}
          </NavLink>
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
  h4 {
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
  }
`;

const content = css`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const link = (darkmode: boolean) => css`
  display: flex;
  flex-flow: row wrap;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${palette.indigo5};
  border-radius: 3px;
  &:hover {
    box-shadow: 1px 1px 10px 2px ${darkmode ? palette.gray9 : palette.gray3};
  }
  &.active {
    box-shadow: 1px 1px 10px 2px ${darkmode ? palette.gray9 : palette.gray3};
  }
`;

export default memo(PostSeries);
