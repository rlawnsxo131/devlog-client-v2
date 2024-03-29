import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import client from './graphql/client';
import rootReducer from './modules';
import { HelmetProvider } from 'react-helmet-async';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: (globalThis as any).__REDUX_STATE__,
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
});

if (process.env.REACT_APP_NODE_ENV === 'production') {
  loadableReady(() => {
    ReactDOM.hydrate(
      <HelmetProvider>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ApolloProvider>
        </Provider>
      </HelmetProvider>,
      document.getElementById('root'),
    );
  });
} else {
  ReactDOM.render(
    <HelmetProvider>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    </HelmetProvider>,
    document.getElementById('root'),
  );
}
