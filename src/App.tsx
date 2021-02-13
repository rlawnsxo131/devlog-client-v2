import * as React from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';
import BaseEffect from './components/base/BaseEffect';
import ErrorBoundary from './components/error/ErrorBoundary';
import Layout from './components/layout/Layout';
import NotFoundPage from './pages/NotFoundPage';

const PostPage = loadable(
  () => import(/* webpackChunkName: "PostPage" */ './pages/PostPage'),
);
const PostsPage = loadable(
  () => import(/* webpackChunkName: "PostsPage" */ './pages/PostsPage'),
);
const SeriesPage = loadable(
  () => import(/* webpackChunkName: "SeriesPage" */ './pages/SeriesPage'),
);
const TagsPage = loadable(
  () => import(/* webpackChunkName: "TagsPage" */ './pages/TagsPage'),
);
const InfoPage = loadable(
  () => import(/* webpackChunkName: "InfoPage" */ './pages/InfoPage'),
);

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
