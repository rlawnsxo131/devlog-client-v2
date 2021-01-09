import { ErrorEnum } from '../modules/error';

function errorCodeReturner(error: any): string {
  let errorCode = '';
  // declare code error
  if (error.graphQLErrors) {
    errorCode = error.graphQLErrors.reduce((acc: string, cur: any) => {
      return cur.extensions?.code ? (acc += cur.extensions.code) : acc;
    }, '');
  }
  // network error
  if (error.networkError) {
    errorCode = ErrorEnum.CHUNK;
  }
  return errorCode ? errorCode : ErrorEnum.UNKNOWN;
}

export default function errorTypeManager(error: any) {
  const errorType = errorCodeReturner(error);
  return errorType;
}
