import { api } from '@serverless/cloud';
import request from 'supertest';
import dotenv from 'dotenv';
import { validGetResponse, getKey, mockPostBody } from './mocks';
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
  const { API_KEY_TEST } = process.env;
  const headers = { api_key: API_KEY_TEST };
  const content = { 'Content-Type': 'application/json' };

  describe('GET Data', () => {
    it('Should correctly retrieve data', async () => {
      const response = await request(api)
        .get(`/data/${getKey()}`)
        .set(headers);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(validGetResponse);
    });
  });

  describe('POST Data', () => {
    it('Should succesfully set a data record', async () => {
      const newKey = 'test_item';
      const response = await request(api)
        .post('/data')
        .set(headers)
        .send(mockPostBody(newKey));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('keyName');
    });
  });
});
