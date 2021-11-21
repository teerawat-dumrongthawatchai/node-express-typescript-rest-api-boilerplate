import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import TodoInstance from '../models';

class TodosController {
  async get (req: Request, res: Response): Promise<Response> {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.page as number | undefined;

      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.json({ records, msg: 'Successfully read todos.', status: 200 });
    } catch (e) {
      return res.json({ msg: 'Fail to read todos.', status: 500 });
    }
  }

  async getById (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const record = await TodoInstance.findOne({ where: { id } });
      return res.json({ record, msg: 'Successfully read todo.', status: 200 });
    } catch (e) {
      return res.json({ msg: 'Fail to read todo.', status: 500 });
    }
  }

  async create (req: Request, res: Response): Promise<Response> {
    const id: string = uuidv4();

    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: 'Successfully create todo.', status: 201 });
    } catch (e) {
      return res.json({ msg: 'Fail to create, something went wrong.', status: 500 });
    }
  }

  async update (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const completed = req.body?.completed as boolean | undefined;

      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: 'Fail to update, can\'t find existing record.', status: 404 });
      }

      const updatedRecord = await record?.update({ completed: completed });
      return res.json({ record: updatedRecord, msg: 'Successfully update todo.', status: 200 });
    } catch (e) {
      return res.json({ msg: 'Fail to update, something went wrong.', status: 500 });
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const record = await TodoInstance.findOne({ where: { id } });
      if (!record) {
        return res.json({ msg: 'Fail to delete, can\'t find existing record.', status: 404 });
      }

      const deletedRecord = await record?.destroy();
      return res.json({ record: deletedRecord, msg: 'Successfully delete todo.', status: 200 });
    } catch (e) {
      return res.json({ msg: 'Fail to delete, something went wrong.', status: 500 });
    }
  }
}

export default new TodosController();
