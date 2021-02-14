import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import router from './server/router';
import ssrMiddleware from './server/middleware';

const app = new Koa();

app.use(
  serve(path.resolve('./build/client'), {
    index: false,
  }),
);

app.use(router.routes()).use(router.allowedMethods());
app.use(ssrMiddleware);

app.listen(3003, () => {
  console.log('SSR server is listening to http://localhost:3003');
});
