import * as React from 'react';
import loadable from '@loadable/component';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>DevLog</title>
        <meta name="description" content="김준태 블로그(DevLog)" />
        <meta property="og:title" content="DevLog" />
        <meta
          property="og:image"
          content={`${process.env.REACT_APP_IMAGE_URL}/logo/devlog.png`}
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SERVICE_URL}`}
        />
        <meta
          name="google-site-verification"
          content="cxSUqcooAfyS9ypQheVFaeT_mqAzuR_D8hjCLI5hP40"
        />
        <link rel="canonical" href={`${process.env.REACT_APP_SERVICE_URL}`} />
      </Helmet>
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
