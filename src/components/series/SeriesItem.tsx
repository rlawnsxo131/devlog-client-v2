import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SeriesData } from '../../graphql/series';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import { RootState } from '../../modules';

interface SeriesItemProps {
  series: SeriesData;
}

function SeriesItem({ series }: SeriesItemProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <div css={block(darkmode)}>
      <div css={header}>
        <h3>{series.series_name}</h3>
        <p>
          마지막 업데이트{' '}
          {formatDate(series.posts[series.posts.length - 1].updated_at)}
        </p>
      </div>

      {series.posts.map((v) => (
        <Link
          key={`seires_posts_${v.url_slug}`}
          to={`/post/${v.url_slug}`}
          css={link(darkmode)}
        >
          {v.post_header}
        </Link>
      ))}
    </div>
  );
}

const block = (darkmode: boolean) => css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 1px 1px 10px 2px ${darkmode ? palette.gray9 : palette.gray3};
  & + & {
    margin-top: 2rem;
  }
`;

const header = css`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding-bottom: 0.5rem;
  h3 {
    margin: 0;
    font-weight: 550;
  }
  p {
    font-size: 0.875rem;
    margin-left: 1rem;
    word-break: break-word;
    overflow-wrap: break-word;
    color: ${palette.gray6};
  }
`;

const link = (darkmode: boolean) => css`
  margin-left: 1rem;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${palette.indigo5};
  border-radius: 3px;
  &:hover {
    box-shadow: 1px 1px 10px 2px ${darkmode ? palette.gray9 : palette.gray3};
  }
  & + & {
    margin-top: 0.5rem;
  }
`;

export default SeriesItem;
