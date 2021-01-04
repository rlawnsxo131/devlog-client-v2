import { useDispatch } from 'react-redux';

export default function errorManager(error: any) {
  console.log(JSON.stringify(error));
  const dispatch = useDispatch();

  // declare code error
  if (error.graphQLErrors) {
    const errorCode = error.graphQLErrors.reduce((acc: string, cur: any) => {
      return cur.extensions?.code ? (acc += cur.extensions.code) : acc;
    }, '');
  }

  // network error
  if (error.networkError) {
  }
}
