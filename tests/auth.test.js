import { app } from '../server.js';
import request from 'supertest';
import client from '@prisma/client';

const newUser = {
  email: 'w1ckedd2@gmail.com',
  password: '123456',
  password2: '123456',
  first_name: 'Alireza',
  last_name: 'Choubineh',
  display_name: 'W1ckedD',
};

describe('POST /auth', () => {
  describe('/register', () => {
    test('Passwords do not match, should respond with a 400 status code.', async () => {
      let _user = { ...newUser };
      _user.password2 = '1234567';
      const res = await request(app).post('/auth/register/').send(_user);
      expect(res.statusCode).toBe(400);
    });

    test('Required field not provided, should respond with a 500 status code.', async () => {
      let _user = { ...newUser };
      delete _user.email;
      const res = await request(app).post('/auth/register/').send(_user);
      expect(res.statusCode).toBe(500);
    });

    test('Everything is normal, should respond with a 201 status code.', async () => {
      const res = await request(app).post('/auth/register/').send(newUser);
      expect(res.body.user.email).toBe(newUser.email);
      expect(res.body.user.password).not.toBe(newUser.password);
      expect(res.body.token).toBeTruthy();
      expect(res.statusCode).toBe(201);
    });

    test('Email already exists, should respond with a 409 status code.', async () => {
      const res = await request(app).post('/auth/register/').send(newUser);
      expect(res.statusCode).toBe(409);
    });

    test('Remove the created user', async () => {
      const prisma = new client.PrismaClient();
      const res = await prisma.user.delete({ where: { email: newUser.email } });
      expect(res.email).toBe(newUser.email);
    });
  });
});
