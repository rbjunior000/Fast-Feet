import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  router() {
    this.server.use(routes);
  }
}

export default new App().server;
