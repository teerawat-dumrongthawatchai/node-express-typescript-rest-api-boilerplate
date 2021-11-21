import request from 'supertest';
import app from '../src/app';
import TodoInstance from '../src/modules/todos/models';

describe('test create route', () => {
  const todo = {
    title: 'Create todo'
  };

  it('Should have key record and msg when created', async () => {
    const res = await request(app).post('/api/v1/todos/create').send(todo);

    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('record');
  });

  it('Should handle exception', async () => {
    const mockCreateTodo = jest.fn((): any => {
      throw 'error';
    });
    jest
      .spyOn(TodoInstance, 'create')
      .mockImplementation(() => mockCreateTodo());

    const res = await request(app).post('/api/v1/todos/create').send(todo);

    expect(res.body).toEqual({
      msg: 'Fail to create, something went wrong.',
      status: 500
    });
  });

  it('Should handle request param', async () => {
    const res = await request(app).post('/api/v1/todos/create').send({});

    expect(res.body).toEqual({
      msg: 'Fail to create, bad request.',
      errors: [
        {
          msg: 'The title value should not be empty.',
          param: 'title',
          location: 'body'
        }
      ]
    });
  });
});

describe('test todos list  route', () => {
  const todo = {
    title: 'Create todo'
  };

  it('Should return array of todo', async () => {
    const mockReadAllTodo = jest.fn((): any => [todo]);
    jest
      .spyOn(TodoInstance, 'findAll')
      .mockImplementation(() => mockReadAllTodo());

    const res = await request(app).get('/api/v1/todos/?limit=5');

    expect(mockReadAllTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: 'Successfully read todos.',
      records: [{ title: 'Create todo' }],
      status: 200
    });
  });

  it('Should handle exception', async () => {
    const mockCreateTodo = jest.fn((): any => {
      throw 'error';
    });
    jest
      .spyOn(TodoInstance, 'findAll')
      .mockImplementation(() => mockCreateTodo());

    const res = await request(app).get('/api/v1/todos/?limit=5');
    expect(mockCreateTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: 'Fail to read todos.',
      status: 500
    });
  });

  it('Should handle request params', async () => {
    const res = await request(app).get('/api/v1/todos/?limit=0');

    expect(res.body).toEqual({
      msg: 'Fail to create, bad request.',
      errors: [
        {
          value: '0',
          msg: 'The limit value should be between 1 to 10.',
          param: 'limit',
          location: 'query'
        }
      ]
    });
  });
});

describe('test read todo by id  route', () => {
  const todo = {
    id: '1da9b762-838b-489c-b521-64cb523ffdd9',
    title: 'Create todo'
  };

  it('Should return array of todo', async () => {
    const mockReadTodo = jest.fn((): any => [todo]);

    jest
      .spyOn(TodoInstance, 'findOne')
      .mockImplementation(() => mockReadTodo());

    const res = await request(app).get('/api/v1/todos/1da9b762-838b-489c-b521-64cb523ffdd9');

    expect(mockReadTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      record: [
        {
          id: '1da9b762-838b-489c-b521-64cb523ffdd9',
          title: 'Create todo'
        }
      ],
      msg: 'Successfully read todo.',
      status: 200
    });
  });

  it('Should handle exception', async () => {
    const mockReadTodo = jest.fn((): any => {
      throw 'error';
    });
    jest
      .spyOn(TodoInstance, 'findOne')
      .mockImplementation(() => mockReadTodo());

    const res = await request(app).get('/api/v1/todos/1da9b762-838b-489c-b521-64cb523ffdd9');
    expect(mockReadTodo).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      msg: 'Fail to read todo.',
      status: 500
    });
  });

  it('Should handle request params', async () => {
    const res = await request(app).get('/api/v1/todos/1');

    expect(res.body).toEqual({
      msg: 'Fail to create, bad request.',
      errors: [
        {
          value: '1',
          msg: 'The id value should be UUID v4.',
          param: 'id',
          location: 'params'
        }
      ]
    });
  });
});

describe('test update todo  route', () => {
  const todo = {
    id: '1da9b762-838b-489c-b521-64cb523ffdd9',
    title: 'Create todo',
    completed: 0
  };

  it('Should have key record and msg when updated', async () => {
    const createRes = await request(app).post('/api/v1/todos/create').send(todo);
    const { record } = createRes.body;

    const res = await request(app).put(`/api/v1/todos/update/${record.id}`).send(todo);

    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('record');
  });

  it('Should handle exception', async () => {
    const mockReadTodo = jest.fn((): any => {
      throw 'error';
    });
    jest
      .spyOn(TodoInstance, 'findOne')
      .mockImplementation(() => mockReadTodo());

    const res = await request(app).put(`/api/v1/todos/update/${todo.id}`).send(todo);
    expect(res.body).toEqual({
      msg: 'Fail to update, something went wrong.',
      status: 500
    });
  });

  it('Should handle not found todo', async () => {
    const res = await request(app).put('/api/v1/todos/update/1da9b762-838b-489c-b521-64cb523ffdd9').send(todo);
    expect(res.body).toEqual({ 
      msg: "Fail to update, can't find existing record.", 
      status: 404 
    });
  });
});

describe('test delete todo  route', () => {
  const todo = {
    id: '1da9b762-838b-489c-b521-64cb523ffdd9',
    title: 'Create todo',
    completed: 0
  };

  it('Should have key record and msg when deleted', async () => {
    const createRes = await request(app).post('/api/v1/todos/create').send(todo);
    const { record } = createRes.body;

    const res = await request(app).delete(`/api/v1/todos/delete/${record.id}`);

    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('record');
  });

  it('Should handle exception', async () => {
    const mockReadTodo = jest.fn((): any => {
      throw 'error';
    });
    jest
      .spyOn(TodoInstance, 'findOne')
      .mockImplementation(() => mockReadTodo());

    const res = await request(app).delete(`/api/v1/todos/delete/${todo.id}`).send(todo);
    expect(res.body).toEqual({
      msg: 'Fail to delete, something went wrong.',
      status: 500
    });
  });

  it('Should handle not found todo', async () => {
    const res = await request(app).delete('/api/v1/todos/delete/1da9b762-838b-489c-b521-64cb523ffdd9').send(todo);
    expect(res.body).toEqual({ 
      msg: "Fail to delete, can't find existing record.", 
      status: 404 
    });
  });
});
