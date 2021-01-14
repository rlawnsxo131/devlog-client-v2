import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import BadRequestImage from '../../img/components/BadRequestImage';
import ChunkImage from '../../img/components/ChunkImage';
import NetworkImage from '../../img/components/NetworkImage';
import NotFoundImage from '../../img/components/NotFoundImage';
import UnknownImage from '../../img/components/UnknownImage';
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
  if (errorType === ErrorEnum.NOT_FOUND) return <NotFoundImage />;
  if (errorType === ErrorEnum.UNKNOWN) return <UnknownImage />;
  if (errorType === ErrorEnum.BAD_REQUEST) return <BadRequestImage />;
  if (errorType === ErrorEnum.NETWORK) return <NetworkImage />;
  if (errorType === ErrorEnum.CHUNK) return <ChunkImage />;
  return <UnknownImage />;
}

function ErrorScreen({ errorType, handleResolveError }: ErrorScreenProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const onClick = useCallback(() => {
    handleResolveError();
    dispatch(resetError({}));
    history.push('/');
  }, [history, dispatch, handleResolveError]);

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
