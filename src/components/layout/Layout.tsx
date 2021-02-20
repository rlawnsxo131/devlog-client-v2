import { useSelector } from 'react-redux';
import styled, { createGlobalStyle, css } from 'styled-components';
import media from '../../lib/styles/media';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <>
      <GlobalStyle darkmode={darkmode} />
      <Block>
        <Header />
        <Main>
          <ContentBlock>{children}</ContentBlock>
        </Main>
        <div className="copyright">© 2020 · DevLog</div>
      </Block>
    </>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
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
  width: 100%;
  display: flex;
  justify-content: center;
  ${media.xsmall} {
    margin-top: 4rem;
  }
  ${media.medium} {
    margin-top: 5.5rem;
  }
`;

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.xsmall} {
    width: 100%;
    padding: 1rem;
  }
  ${media.medium} {
    width: 53rem;
    padding: 1rem 0 1rem 0;
  }
  ${media.large} {
    width: 64rem;
  }
`;

const GlobalStyle = createGlobalStyle<{ darkmode: boolean }>`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* font-family: 'Montserrat', sans-serif, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 나눔고딕,
    'Nanum Gothic', 'Noto Sans KR', 'Noto Sans CJK KR', arial, 돋움, Dotum,
    Tahoma, Geneva, sans-serif; */
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${(props) =>
      props.darkmode &&
      css`
        background: ${darkmodeBackground.main};
      `}
  }

  a {
    text-decoration: none;
    &:hover {
      cursor: pointer;
    } 
  }
  
  color: ${palette.gray9};

  // nav, font color
  ${(props) =>
    props.darkmode
      ? css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          a {
            color: ${palette.gray3};
          }
          div,
          span:not(.token),
          p {
            color: ${palette.gray5};
          }
          main {
            background: ${darkmodeBackground.main};
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
          span:not(.token),
          p,
          a {
            color: ${palette.gray9};
          }
          main {
            background: white;
          }
        `}
`;

export default Layout;
