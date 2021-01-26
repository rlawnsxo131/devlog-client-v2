import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import BaseEffect from './components/base/BaseEffect';
import ErrorBoundary from './components/error/ErrorBoundary';
import Layout from './components/layout/Layout';
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
            <Route exact path="/" component={PostsPage} />
            <Route path="/series" component={SeriesPage} />
            <Route path="/tags" render={TagsPage} />
            <Route path="/info" render={() => <div>info</div>} />
            <Route path="/posts/:tag" render={PostsPage} />
            <Route path="/post/:url_slug" component={PostPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </BaseEffect>
    </ErrorBoundary>
  );
}

export default App;
