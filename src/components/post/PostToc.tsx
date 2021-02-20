import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import media, { mediaQuery } from '../../lib/styles/media';
import palette from '../../lib/styles/palette';

type PostTocProps = {};
type Headings = Array<{
  text: string;
  level: number;
  height: number;
}>;
function PostToc(props: PostTocProps) {
  const { pathname } = useLocation();
  const [toc, setToc] = useState<Headings | null>(null);
  const [currentTocId, setCurrentTocId] = useState(0);
  const parseHeadings = useCallback(() => {
    let headings: Headings = [];
    const nodes = document.querySelectorAll('div[class*=atom-] *');
    nodes.forEach((el) => {
      if (el.tagName.match(/H([1-3])/)) {
        headings.push({
          text: el.textContent || '',
          level: parseInt(el.tagName.replace('H', ''), 10),
          height: el.getBoundingClientRect().y - 100,
        });
      }
    });
    return headings;
  }, [pathname]);
  const onTocClick = useCallback((e) => {
    const { value } = e.target;
    setCurrentTocId(parseFloat(value));
    globalThis.scrollTo(0, value);
  }, []);

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      const headings = parseHeadings();
      setToc(headings);
    }, 50);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathname]);

  return (
    <Block>
      {toc?.map((v) => (
        <Toc
          key={v.height}
          value={v.height}
          level={v.level}
          active={currentTocId === v.height}
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
