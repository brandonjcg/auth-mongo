import express, { Application, Request, Response } from 'express';
import 'dotenv/config';

class App {
  public app: Application;

  public port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.disable('x-powered-by');
  }

  private routes() {
    this.app.use('/', (req: Request, res: Response) => {
      res.json({
        message: 'Hello from auth 🔒',
      });
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }
}

const app = new App();
app.listen();
