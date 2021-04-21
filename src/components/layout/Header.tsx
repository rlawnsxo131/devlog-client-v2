import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import media from '../../lib/styles/media';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import zIndexes from '../../lib/styles/zIndexes';
import { RootState } from '../../modules';
import HeaderItems from './HeaderItems';

interface HeaderProps {}

function Header(props: HeaderProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );

  return (
    <header css={headerStyle(darkmode)}>
      <div css={contentStyle}>
        <NavLink exact to="/" css={linkStyle}>
          <h1>DevLog</h1>
        </NavLink>
        <HeaderItems darkmode={darkmode} />
      </div>
    </header>
  );
}

const headerStyle = (darkmode: boolean) => css`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  z-index: ${zIndexes.header};
  ${darkmode
    ? css`
        background: ${darkmodeBackground.other};
        box-shadow: 1px 1px 10px 2px ${palette.gray9};
      `
    : css`
        background: ${palette.white};
        box-shadow: 1px 1px 10px 2px ${palette.gray3};
      `}
`;

const contentStyle = css`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  ${media.xsmall} {
    width: 92vw;
  }
  ${media.medium} {
    width: 53rem;
  }
  ${media.large} {
    width: 64rem;
  }
`;

const linkStyle = css`
  display: inline-flex;
  flex-flow: row wrap;
  font-size: 1.25rem;
  padding: 0.5rem 0.25rem 0.5rem 0.25rem;
  h1 {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

export default Header;
