import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import BaseEffect from './components/base/BaseEffect';
import ErrorBoundary from './components/error/ErrorBoundary';
import Layout from './components/layout/Layout';
import InfoPage from './pages/InfoPage';
import NotFoundPage from './pages/NotFoundPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import SeriesPage from './pages/SeriesPage';
import TagsPage from './pages/TagsPage';

type AppProps = {};

function App(props: AppProps) {
  return (
    <ErrorBoundary>
      <BaseEffect>
        <Layout>
          <Switch>
            <Route exact path="/">
              <PostsPage />
            </Route>
            <Route path="/series">
              <SeriesPage />
            </Route>
            <Route path="/tags">
              <TagsPage />
            </Route>
            <Route path="/info">
              <InfoPage />
            </Route>
            <Route path="/posts/:tag">
              <PostsPage />
            </Route>
            <Route path="/post/:url_slug">
              <PostPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </Layout>
      </BaseEffect>
    </ErrorBoundary>
  );
}

export default App;
