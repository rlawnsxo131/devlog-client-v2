import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
  ],
});

if (process.env.NODE_ENV === 'production') {
  // loadable
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
