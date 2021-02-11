import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import BadRequestImage from '../../img/components/error/BadRequestImage';
import ChunkErrorImage from '../../img/components/error/ChunkErrorImage';
import NetworkErrorImage from '../../img/components/error/NetworkErrorImage';
import NotFoundErrorImage from '../../img/components/error/NotFoundErrorImage';
import UnknownErrorImage from '../../img/components/error/UnknownErrorImage';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';
import { ErrorEnum, errorMessageMap, resetError } from '../../modules/error';
import Button from '../common/Button';

type ErrorScreenProps = {
  errorType: ErrorEnum;
  handleResolveError: () => void;
};

const { useCallback } = React;

function ErrorImageReturner({ errorType }: { errorType: ErrorEnum }) {
  if (errorType === ErrorEnum.NOT_FOUND) return <NotFoundErrorImage />;
  if (errorType === ErrorEnum.UNKNOWN) return <UnknownErrorImage />;
  if (errorType === ErrorEnum.BAD_REQUEST) return <BadRequestImage />;
  if (errorType === ErrorEnum.NETWORK) return <NetworkErrorImage />;
  if (errorType === ErrorEnum.CHUNK) return <ChunkErrorImage />;
  return <UnknownErrorImage />;
}

const { useEffect } = React;
function ErrorScreen({ errorType, handleResolveError }: ErrorScreenProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );

  const clearError = useCallback(() => {
    handleResolveError();
    dispatch(resetError({}));
  }, [dispatch, handleResolveError]);

  const onClick = useCallback(() => {
    clearError();
    history.push('/');
  }, [clearError]);

  useEffect(() => {
    if (!errorType) return;
    return () => {
      clearError();
    };
  }, [clearError, pathname, errorType]);

  return (
    <Block darkmode={darkmode}>
      <ErrorImageReturner errorType={errorType} />
      <h3>{errorMessageMap.get(errorType)}</h3>
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
  white-space: pre-wrap;
  svg {
    height: auto;
    width: 320px;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 2.5rem;
    font-weight: normal;
    text-align: center;
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

export default ErrorScreen;
