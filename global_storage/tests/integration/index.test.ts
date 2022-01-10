import { api } from '@serverless/cloud';
import request from 'supertest';
import dotenv from 'dotenv';
import { validGetResponse } from './mocks';
//import { jest } from '@jest/globals';

dotenv.config();

test("should return a 'Healthy' 200 status", async () => {
  const response = await api.get('/').invoke();

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({ message: 'Healthy' });

  /*expect(body).toHaveProperty('users');
  expect(body.users.length).toBeGreaterThan(0);*/
});

describe('Main', () => {
  const content = { 'Content-Type': 'application/json' };
  const { API_KEY_TEST } = process.env;

  it('Should correctly retrieve data', async () => {
    const response = await request(api)
      .get('/data/testKey')
      .set({ api_key: API_KEY_TEST });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(validGetResponse);
  });
});
