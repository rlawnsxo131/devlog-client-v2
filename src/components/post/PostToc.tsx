import { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { throttle } from 'throttle-debounce';
import media, { mediaQuery } from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import { getScrollTop } from '../../lib/utils';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

interface PostTocProps {}
interface Heading {
  text: string;
  level: number;
  scrollTop: number;
}

function PostToc(props: PostTocProps) {
  if (typeof window === 'undefined') return null;
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const { pathname } = useLocation();
  const [tocs, setTocs] = useState<Array<Heading> | null>(null);
  const [currentHeading, setCurrentHeading] = useState(0);

  const parseHeadings = useCallback(() => {
    let headings: Array<Heading> = [];
    const scrollTop = getScrollTop();
    const nodes = document.querySelectorAll('div[class*=atom-] *');
    if (!nodes) return;
    nodes.forEach((el) => {
      if (el.tagName.match(/H([1-3])/)) {
        headings.push({
          text: el.textContent || '',
          level: parseInt(el.tagName.replace('H', ''), 10),
          scrollTop: parseInt(
            `${el.getBoundingClientRect().top + scrollTop - 80}`,
            10,
          ),
        });
      }
    });
    return headings;
  }, []);

  const updateTocs = useCallback(() => {
    const headings = parseHeadings();
    if (!headings) return;
    setTocs(headings);
  }, [pathname, document.body.scrollHeight]);

  const onTocClick = useCallback((e) => {
    const { value } = e.target;
    const top = parseInt(value, 10);
    setCurrentHeading(top);
    globalThis.scrollTo(0, top);
  }, []);

  const onScroll = useMemo(() => {
    return throttle(50, () => {
      if (!tocs) return;
      const scrollTop = getScrollTop();
      const currentHeading = [...tocs].reverse().find((toc) => {
        return scrollTop >= toc.scrollTop - 80;
      });
      if (!currentHeading) return;
      setCurrentHeading(currentHeading.scrollTop);
    });
  }, [tocs]);

  useEffect(() => {
    let prevScrollHeight = document.body.scrollHeight;
    let timeoutId: NodeJS.Timeout | null = null;
    updateTocs();
    function lazyUpdateTocs() {
      const scrollHeight = document.body.scrollHeight;
      if (prevScrollHeight !== scrollHeight) {
        updateTocs();
      }
    }
    timeoutId = setTimeout(lazyUpdateTocs, 250);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateTocs]);

  useEffect(() => {
    globalThis.addEventListener('scroll', onScroll);
    return () => {
      setCurrentHeading(0);
      globalThis.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  if (!tocs?.length) return null;

  return (
    <div css={block}>
      {tocs?.map((v) => (
        <button
          key={v.scrollTop}
          value={v.scrollTop}
          css={toc(darkmode, v.level, v.scrollTop === currentHeading)}
          onClick={onTocClick}
        >
          {v.text.toString()}
        </button>
      ))}
    </div>
  );
}

const block = css`
  display: none;
  ${mediaQuery(1300)} {
    position: fixed;
    top: 10rem;
    right: 0;
    width: 13rem;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-left: 0.125rem solid ${palette.gray3};
  }
  ${mediaQuery(1340)} {
    right: 1vw;
  }
  ${media.xlarge} {
    right: 4vw;
  }
  ${mediaQuery(1500)} {
    right: 7vw;
  }
  ${mediaQuery(1600)} {
    right: 10vw;
  }
`;

const toc = (darkmode: boolean, level: number, active: boolean) => css`
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  text-align: left;
  outline: none;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: ${palette.gray6};
  padding-left: ${level * 1}rem;
  transition: 0.125s all ease-in;
  &:hover {
    cursor: pointer;
  }
  ${active &&
  css`
    color: ${darkmode ? palette.gray3 : palette.gray9};
    transform: scale(1.05);
  `}
`;

export default PostToc;
