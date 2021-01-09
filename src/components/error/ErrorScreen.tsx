import * as React from 'react';
import styled from 'styled-components';
import { ErrorEnum } from '../../modules/error';

type ErrorScreenProps = {
  errorType: ErrorEnum;
  handleResolveError: () => void;
};

const { useMemo } = React;
function ErrorScreen({ errorType, handleResolveError }: ErrorScreenProps) {
  const errorMessage = useMemo(() => {
    if (errorType === 'NOT_FOUND') {
      return '찾을 수 없습니다';
    }
    if (errorType === 'BAD_REQUEST') {
      return '잘못된 요청입니다';
    }
    if (errorType === 'UNKNOWN') {
      return '알 수 없는 에러발생';
    }
    if (errorType === 'CHUNK') {
      return 'devlog 가 업데이트 되었습니다. 새로고침을 해주세요';
    }
    return '찾을 수 없습니다';
  }, [errorType]);

  return <Block>{errorMessage}</Block>;
}

const Block = styled.div``;

export default ErrorScreen;
