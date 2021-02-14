import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import client from './graphql/client';
import rootReducer from './modules';

const store = configureStore({
  reducer: rootReducer,
  preloadedState: (window as any).__REDUX_STATE__,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
  ],
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
});

if (process.env.REACT_APP_NODE_ENV === 'production') {
  loadableReady(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>,
      document.getElementById('root'),
    );
  });
} else {
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>,
    document.getElementById('root'),
  );
}
