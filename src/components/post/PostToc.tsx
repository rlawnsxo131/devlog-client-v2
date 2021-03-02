import { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import media, { mediaQuery } from '../../lib/styles/media';
import palette from '../../lib/styles/palette';
import { getScrollTop } from '../../lib/utils';

interface PostTocProps {}
interface Heading {
  text: string;
  level: number;
  scrollTop: number;
}

function PostToc(props: PostTocProps) {
  if (typeof window === 'undefined') return null;
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
            `${el.getBoundingClientRect().top + scrollTop - 100}`,
            10,
          ),
        });
      }
    });
    return headings;
  }, []);

  const onTocClick = useCallback((e) => {
    const { value } = e.target;
    globalThis.scrollTo(0, value);
  }, []);

  const onScroll = useCallback(
    (e) => {
      if (!tocs) return;
      const scrollTop = getScrollTop();
      const currentHeading = [...tocs].reverse().find((toc) => {
        return scrollTop >= toc.scrollTop - 80;
      });
      if (!currentHeading) {
        setCurrentHeading(0);
        return;
      }
      setCurrentHeading(currentHeading.scrollTop);
    },
    [tocs],
  );

  useEffect(() => {
    const headings = parseHeadings();
    if (!headings) return;
    setTocs(headings);
  }, [document?.body?.scrollHeight]);

  useEffect(() => {
    globalThis.addEventListener('scroll', onScroll);
    return () => {
      globalThis.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Block>
      {tocs?.map((v) => (
        <Toc
          key={v.scrollTop}
          value={v.scrollTop}
          level={v.level}
          active={v.scrollTop === currentHeading}
          onClick={onTocClick}
        >
          {v.text.toString()}
        </Toc>
      ))}
    </Block>
  );
}

const Block = styled.div`
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

const Toc = styled.button<{ level: number; active: boolean }>`
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
  padding-left: ${(props) => props.level * 1}rem;
  transition: font 0.2s;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.active &&
    css`
      font-size: 0.9rem;
      color: ${palette.indigo5};
    `}
`;

export default PostToc;
