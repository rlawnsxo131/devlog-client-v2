import path from 'path';
import fetch from 'cross-fetch';
import ReactDOMServer from 'react-dom/server';
import {
  ApolloClient,
  ApolloError,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../modules';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ErrorEnum, setError } from '../../modules/error';
import App from '../../App';
import Html from './Html';
import { FilledContext, HelmetProvider } from 'react-helmet-async';

const statsFile = path.resolve(__dirname, '../client/loadable-stats.json');

interface ServerRenderParams {
  url: string;
}

async function serverRender({ url }: ServerRenderParams) {
  if (/^\/(api|graphql)/.test(url)) {
    return null;
  }

  const store = configureStore({
    reducer: rootReducer,
  });
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${process.env.REACT_APP_API_URI}/graphql`,
      fetch,
      credentials: 'include',
    }),
    cache: new InMemoryCache(),
  });
  const context = {
    statusCode: 200,
  };
  const extractor = new ChunkExtractor({
    statsFile,
    publicPath: process.env.REACT_APP_PUBLIC_URL,
  });
  const helmetContext = {} as FilledContext;
  const Root = (
    <ChunkExtractorManager extractor={extractor}>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <StaticRouter location={url} context={context}>
              <App />
            </StaticRouter>
          </ApolloProvider>
        </Provider>
      </HelmetProvider>
    </ChunkExtractorManager>
  );
  try {
    await getDataFromTree(Root);
  } catch (e: any) {
    console.log('Apollo Error! Rendering result anyways');
    if (e instanceof ApolloError) {
      const notFound = e.graphQLErrors.some(
        (ge) => (ge.extensions as any)?.code === 'NOT_FOUND',
      );
      if (notFound)
        store.dispatch(
          setError({
            errorType: ErrorEnum.NOT_FOUND,
          }),
        );
    }
    console.log(e.name);
    console.log(e.message);
    console.log(JSON.stringify(e));
  }

  const content = ReactDOMServer.renderToString(Root);
  const initialState = client.extract();
  const html = (
    <Html
      content={content}
      apolloState={initialState}
      reduxState={store.getState()}
      extractor={extractor}
      helmet={helmetContext.helmet}
    />
  );

  const pageHtml = `<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(
    html,
  )}`;

  return { html: pageHtml, statusCode: context.statusCode };
}

export default serverRender;
