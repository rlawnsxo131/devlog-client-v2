import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette, { darkmodeBackground } from '../lib/styles/palette';
import { ErrorEnum, errorMessageMap, resetError } from '../modules/error';
import Button from '../components/common/Button';
import zIndexes from '../lib/styles/zIndexes';
import { RootState } from '../modules';
import NotFoundImage from '../img/components/error/NotFoundErrorImage';
import { Helmet } from 'react-helmet-async';
import { useCallback } from 'react';

interface NotFoundPageProps {}

function NotFoundPage(props: NotFoundPageProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const onClick = useCallback(() => {
    dispatch(resetError({}));
    history.push('/');
  }, [history, dispatch]);
  return (
    <Block darkmode={darkmode}>
      <Helmet>
        <title>NOT_FOUND - DevLog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <NotFoundImage />
      <h3>{errorMessageMap.get(ErrorEnum.NOT_FOUND)}</h3>
      <Button color="indigo" onClick={onClick}>
        Home
      </Button>
    </Block>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.darkmode ? darkmodeBackground.main : 'white'};
  z-index: ${zIndexes.notFoundPage};
  svg {
    height: auto;
    width: 20rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 2.5rem;
    font-weight: normal;
    margin-bottom: 1rem;
  }
  ${(props) =>
    props.darkmode
      ? css`
          background: ${darkmodeBackground.main};
          h3 {
            color: ${palette.gray5};
          }
        `
      : css`
          background: white;
          h3 {
            color: ${palette.gray7};
          }
        `}
`;

export default NotFoundPage;
