import { Router } from 'express';
import TodosController from '../controllers';
import TodoValidator from '../validators';
import Middleware from '../../../middleware';

const TodosRouter: Router = Router();

TodosRouter.get(
  '/',
  TodoValidator.checkGetTodos(),
  Middleware.handleValidationError,
  TodosController.get
);

TodosRouter.get(
  '/:id',
  TodoValidator.checkParamId(),
  Middleware.handleValidationError,
  TodosController.getById
);

TodosRouter.post(
  '/create',
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  TodosController.create
);

TodosRouter.put(
  '/update/:id',
  TodoValidator.checkUpdateTodo(),
  Middleware.handleValidationError,
  TodosController.update
);

TodosRouter.delete(
  '/delete/:id',
  TodoValidator.checkParamId(),
  Middleware.handleValidationError,
  TodosController.delete
);

export default TodosRouter;
