/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { environment } from './environments/environment';
import * as axios from 'axios';

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
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  server.route({
    method: 'GET',
    path: '/api/beta/stock/{symbol}/chart/{period}',
    handler: async (request, h) => {
      const symbol = request.params.symbol
      const period = request.params.period
      const res = await axios.default.get(environment.apiURL+'/beta/stock/'+symbol+'/chart/'+period+'?token='+environment.apiKey)
      return res.data;
      },
    options: {
      cache: {
        expiresIn: 1 * 60 * 10 * 1000,
        privacy: 'private'
      }
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
