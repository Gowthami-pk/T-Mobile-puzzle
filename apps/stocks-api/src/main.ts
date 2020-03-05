/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { stockApiRequest } from './services/stockApi';


const  config = {
  expiresInMS : 30,
  generateTimeout: 6
};
const minute = 60000;
const whiteListOrigin = ['http://localhost:4200'];

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost',
    routes: {
      cors: {
        origin: whiteListOrigin,
        headers: ['Accept', 'Content-Type'],
        exposedHeaders: []
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/beta/stock/{symbol}/chart/{period}',
    options: {
      log: {
        collect: true
      }
    },
    handler: async request => {
      return server.methods.stockApiRequest(request.path);
    }
  });

  server.method('stockApiRequest', stockApiRequest, {
    cache: {
      expiresIn: config.expiresInMS * minute,
      generateTimeout: config.generateTimeout * minute
    },
    generateKey: (symbol, range) => symbol + '.' + range
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
