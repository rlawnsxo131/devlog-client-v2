import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Paragraph from '../common/Paragraph';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';

interface SeriesSkeletonProps {}

function SeriesItemSkeleton() {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <div css={block(darkmode)}>
      <Paragraph
        style={css`
          width: 60%;
          height: 2rem;
        `}
      />
      {Array.from({ length: 3 }).map((_, i) => (
        <Paragraph
          key={`series_item_title_${i}`}
          style={css`
            height: 1.5rem;
            margin-top: 1rem;
            margin-left: 1.5rem;
          `}
        />
      ))}
    </div>
  );
}

const block = (darkmode: boolean) => css`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  & + & {
    margin-top: 2rem;
  }
  ${darkmode
    ? css`
        box-shadow: 1px 1px 5px 2px ${palette.gray9};
      `
    : css`
        box-shadow: 1px 1px 5px 2px ${palette.gray1};
      `};
`;

function SeriesSkeleton(props: SeriesSkeletonProps) {
  return (
    <MediaRatioWrapper type="column">
      {Array.from({ length: 10 }).map((_, i) => (
        <SeriesItemSkeleton key={`series_skeleton_${i}`} />
      ))}
    </MediaRatioWrapper>
  );
}

export default SeriesSkeleton;
