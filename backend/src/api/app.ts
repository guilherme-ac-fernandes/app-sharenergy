import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import connectToDatabase from '../models/connection';
// import userRouter from './routes/UserRouter';
import errorHandler from '../middlewares/error';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(cors());

    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.userRouter();
    this.app.use(errorHandler);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private userRouter(): void {
    const userModel = new UserModel();
    const userService = new UserService(userModel);
    const userController = new UserController(userService);

    this.app.get('/user/:id', (req, res) => userController.readOne(req, res));
    this.app.put('/user/:id', (req, res) => userController.update(req, res));
    this.app.delete('/user/:id', (req, res) => userController.delete(req, res));
    this.app.post('/user', (req, res) => userController.create(req, res));
    this.app.get('/user', (req, res) => userController.read(req, res));
  }

  public start(PORT: string | number): void {
    connectToDatabase()
      .then(() => {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
      })
      .catch((error) => {
        console.log('Connection with database generated an error:\r\n');
        console.error(error);
        console.log('\r\nServer initialization cancelled');
        process.exit(0);
      });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
