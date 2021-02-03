import fastify from 'fastify';
import compress from 'fastify-compress';

const PORT = parseInt(process.env.PORT! || '3003', 10);

export default class Server {
  private app = fastify({ logger: true });

  constructor() {
    this.setup();
  }

  setup() {
    this.app.register(compress);
    this.app.get('/', async (request, reply) => {
      reply.send({ hello: 'world' });
    });
    this.app.get<{ Params: { id: number } }>('/:id', async (request, reply) => {
      reply.send({ id: request.params.id });
    });
  }

  start() {
    try {
      this.app.listen(PORT);
    } catch (e) {
      this.app.log.error(e);
    }
  }
}
