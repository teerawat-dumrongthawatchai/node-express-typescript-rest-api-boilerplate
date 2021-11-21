import express, { Application } from 'express';
import TodosRouter from './modules/todos/routes';

const app: Application = express();
app.use(express.json());

app.use('/api/v1/todos', TodosRouter);

export default app;
