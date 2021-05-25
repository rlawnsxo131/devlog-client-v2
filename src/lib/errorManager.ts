import { CommentErrorEnum } from '../modules/comment';
import { ErrorEnum } from '../modules/error';

function errorCodeReturner(error: any): ErrorEnum | CommentErrorEnum {
  let errorCode = ErrorEnum.UNKNOWN;

  // declare code error
  if (error.graphQLErrors) {
    errorCode = error.graphQLErrors.reduce((acc: string, cur: any) => {
      if (cur.extensions?.code) {
        acc += cur.extensions.code;
      }
      return acc;
    }, '');
  }

  // network error
  if (error.networkError) {
    errorCode = ErrorEnum.NETWORK;
  }
  return errorCode;
}

export default function errorManager(error: any) {
  const errorType = errorCodeReturner(error);
  return errorType;
}
