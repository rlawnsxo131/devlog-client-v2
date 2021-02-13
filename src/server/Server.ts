import fastify from 'fastify';
import compress from 'fastify-compress';
import serverRender from './decorates/serverRender';
import routes from './routes';
import fastifyStatic from 'fastify-static';
import path from 'path';

const PORT = parseInt(process.env.PORT! || '3003', 10);
const staticPath = path.resolve(__dirname, '../client');

export default class Server {
  private app = fastify({ logger: true });

  constructor() {
    this.setup();
  }

  setup() {
    this.app.register(fastifyStatic, {
      root: staticPath,
      decorateReply: false,
    });
    this.app.register(compress);
    this.app.register(routes);
    this.app.register(serverRender);
  }

  start() {
    try {
      this.app.listen(PORT);
    } catch (e) {
      this.app.log.error(e);
    }
  }
}
