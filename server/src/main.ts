import * as socketIo from 'socket.io';
import * as express from 'express';
import { Server } from './server';

const http = require('http');

const httpPort = 9831;
const internalAppPort = 5566;

const app = express();
const internalApp = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer, { path: '/api/socket.io' });

init();

function init() {
  Server.bootstrap(httpServer, app, internalApp, io);

  internalApp.set('port', internalAppPort);
  app.set('port', httpPort);

  internalApp.listen(internalAppPort, () => {
    console.log(`internal app listening on port ${internalAppPort}`);
  });

  httpServer.listen(httpPort);
  httpServer.on('error', onError);
  httpServer.on('listening', onListening);
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof httpPort === 'string' ? `Pipe ${httpPort}` : `Port ${httpPort}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`Listening on ${bind}`);
}
