import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class Middleware {
  handleValidationError (req: Request, res: Response, next: NextFunction): Response | void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Fail to create, bad request.', ...errors });
    }

    next();
  }
}

export default new Middleware();
