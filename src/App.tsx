import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PostCards from './components/post/PostCards';

type AppProps = {};

function App(props: AppProps) {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={PostCards} />
        <Route
          path="/series"
          render={() => <div style={{ height: '150vh' }}>series</div>}
        />
        <Route path="/tags" render={() => <div>tags</div>} />
        <Route path="/info" render={() => <div>info</div>} />
        <Route path="/post/:slug" render={() => <div>post</div>} />
      </Switch>
    </Layout>
  );
}

export default App;
