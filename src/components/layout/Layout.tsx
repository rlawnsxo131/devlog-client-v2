import * as React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import useDarkMode from '../../lib/hooks/useDarkMode';
import media from '../../lib/styles/media';
import palette, { darkModeBackground } from '../../lib/styles/palette';
import Toggle from '../common/Toggle';
import Navigation from './Navigation';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const { darkMode } = useDarkMode();
  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <Block darkMode={darkMode}>
        <Navigation />
        <Toggle />
        <Main>
          <ContentBlock>{children}</ContentBlock>
        </Main>
        <div className="copyright">© 2020 · DevLog</div>
      </Block>
    </>
  );
}

const Block = styled.div<{ darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 120vh;
  ${(props) =>
    props.darkMode &&
    css`
      background: ${darkModeBackground.main};
    `};
  ${media.xsmall} {
    .copyright {
      display: none;
    }
  }
  ${media.medium} {
    .copyright {
      display: block;
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      font-size: 1rem;
    }
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 8.5rem;
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  ${media.xsmall} {
    width: 100vw;
  }
  ${media.medium} {
    width: 64rem;
  }
`;

const GlobalStyle = createGlobalStyle<{ darkMode: boolean }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 나눔고딕,
    'Nanum Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', arial, 돋움, Dotum,
    Tahoma, Geneva, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  // unset elements
  h1, h2, h3, h4, h5, h6, span, p, a {
    all: unset;
  }

  // font style
  h1, h2, h3, h4, h5, h6, span, p, a, div {
    font-family: 'Montserrat', sans-serif;
    transition: color 0.2s ease-in-out;
  }
  // nav, font color
  ${(props) =>
    props.darkMode
      ? css`
          h1,
          h2 {
            color: ${palette.gray3};
          }
          h3,
          h4,
          h5,
          h6,
          a {
            color: ${palette.gray3};
          }
          div,
          span,
          p {
            color: ${palette.gray5};
          }
          nav {
            background: ${darkModeBackground.nav};
          }
          main {
            background: ${darkModeBackground.main};
          }
        `
      : css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          div,
          span,
          p,
          a {
            color: ${palette.gray9};
          }
          nav {
            background: white;
            box-shadow: 1px 1px 10px 2px ${palette.gray3};
          }
          main {
            background: white;
          }
        `}

  a:hover {
    cursor: pointer;
  }
  
  // font size
  ${media.xsmall} {
    h1 {
      font-weight: bold;
      font-size: 1.25rem;
    }
    h2 {
      font-weight: bold;
      font-size: 1.125rem;
    }
    h3 {
      font-weight: 500;
      font-size: 1rem;
    }
    span, p {
      font-size: 0.85rem;
    }
  }
  ${media.medium} {
    h1 {
      font-size: 1.725rem
    }
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1.25rem;
    }
    span, p {
      font-size: 1rem;
    }
  }
`;

export default Layout;
