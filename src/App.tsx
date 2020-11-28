import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PostsPage from './pages/PostsPage';

type AppProps = {};

function App(props: AppProps) {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={PostsPage} />
        <Route path="/series" render={() => <div>series</div>} />
        <Route path="/tags" render={() => <div>tags</div>} />
        <Route path="/info" render={() => <div>info</div>} />
        <Route path="/posts/:tag" render={() => <div>tag post</div>} />
        <Route path="/post/:url_slug" render={() => <div>post</div>} />
      </Switch>
    </Layout>
  );
}

export default App;
