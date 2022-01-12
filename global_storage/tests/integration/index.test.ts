import { api, data } from '@serverless/cloud';
import dotenv from 'dotenv';
import { validGetResponse, getKey, mockPostBody } from './mocks';
//import { jest } from '@jest/globals';

dotenv.config();

test("should return a 'Healthy' 200 status", async () => {
  const response = await api.get('/').invoke();

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({ message: 'Healthy' });
});

describe('Main', () => {
  const { API_KEY_TEST } = process.env;
  const headers = { api_key: API_KEY_TEST };
  const content = { 'Content-Type': 'application/json' };

  describe('GET Data', () => {
    it('Should correctly retrieve data', async () => {
      const response = await api
        .get(`/data/${getKey()}`)
        .invoke(undefined, { headers });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(validGetResponse);
    });

    it('Should respond with an unauthorized error in case incorrect header is used', async () => {
      const badKey = { api_key: 'HEY' };
      const expectedResponse = {
        message: 'Incorrect token. User is not authenticated',
      };

      const response = await api
        .get(`/data/${getKey()}`)
        .invoke(undefined, { headers: badKey });

      expect(response.status).toBe(403);
      expect(response.body).toMatchObject(expectedResponse);
    });

    it('Should return a 404 error when searching by a non-existant key', async () => {
      const expectedResponse = {
        message: `No data associated with the ${getKey(false)} key`,
      };

      const response = await api
        .get(`/data/${getKey(false)}`)
        .invoke(undefined, { headers });

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject(expectedResponse);
    });
  });

  describe('POST Data', () => {
    const newKey = 'test_item';
    it('Should succesfully set a data record', async () => {
      const requestBody = mockPostBody(newKey);

      const response = await api
        .post('/data')
        .invoke(requestBody, { headers });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('keyName');
    });

    afterAll(async () => {
      await data.remove(newKey);
    });
  });

  describe('DELETE Data', () => {
    const keyName = 'testData';

    beforeAll(async () => {
      const requestBody = mockPostBody(keyName);
      await api.post('/data').invoke(requestBody, { headers });
    });

    it('Should correctly delete the specified record', async () => {
      const response = await api
        .delete(`/data/${keyName}`)
        .invoke(undefined, { headers });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });
  });
});
