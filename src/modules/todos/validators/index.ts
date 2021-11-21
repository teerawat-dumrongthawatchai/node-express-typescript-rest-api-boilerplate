import { body, param, query, ValidationChain } from 'express-validator';

class TodoValidator {
  checkGetTodos (): ValidationChain[] {
    return [
      query('limit')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('The limit value should be between 1 to 10.'),
      query('page')
        .optional()
        .isNumeric()
        .withMessage('The page value should be number.')
    ];
  }

  checkParamId (): ValidationChain[] {
    return [
      param('id')
        .notEmpty()
        .withMessage('The id value should not be empty.')
        .isUUID(4)
        .withMessage('The id value should be UUID v4.')
    ];
  }

  checkCreateTodo (): ValidationChain[] {
    return [
      body('id')
        .optional()
        .isUUID(4)
        .withMessage('The id value should be UUID v4.'),
      body('title')
        .notEmpty()
        .withMessage('The title value should not be empty.'),
      body('completed')
        .optional()
        .isBoolean()
        .withMessage('The completed value should be boolean.')
        .isIn([0, false])
        .withMessage('The completed value should be 0 or false.')
    ];
  }

  checkUpdateTodo (): ValidationChain[] {
    return [
      param('id')
        .notEmpty()
        .withMessage('The id value should not be empty.')
        .isUUID(4)
        .withMessage('The id value should be UUID v4.'),
      body('completed')
        .notEmpty()
        .withMessage('The completed value should not be empty')
        .isBoolean()
        .withMessage('The completed value should be boolean.')
        .isIn([0, false, 1, true])
        .withMessage('The completed value should be 0 or false.')
    ];
  }
}

export default new TodoValidator();
