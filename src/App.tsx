import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import BaseEffect from './components/base/BaseEffect';
import Layout from './components/layout/Layout';
import PostDetailPage from './pages/PostDetailPage';
import PostsPage from './pages/PostsPage';

type AppProps = {};

function App(props: AppProps) {
  return (
    <BaseEffect>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostsPage} />
          <Route path="/series" render={() => <div>series</div>} />
          <Route path="/tags" render={() => <div>tags</div>} />
          <Route path="/info" render={() => <div>info</div>} />
          <Route path="/posts/:tag" render={() => <div>tag post</div>} />
          <Route path="/post/:url_slug" component={PostDetailPage} />
        </Switch>
      </Layout>
    </BaseEffect>
  );
}

export default App;
