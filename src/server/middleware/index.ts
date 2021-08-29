import { Middleware } from 'koa';
import serverRender from './serverRender';

const ssrMiddleware: Middleware = async (ctx, next) => {
  try {
    const result = await serverRender({
      url: ctx.url,
    });
    if (!result) {
      return next();
    }
    ctx.body = result.html;
    ctx.status = result.statusCode;
  } catch (e: any) {
    ctx.throw(500, e);
  }
};

export default ssrMiddleware;
