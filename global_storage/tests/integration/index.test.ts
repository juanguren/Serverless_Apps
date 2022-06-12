import { api, data } from '@serverless/cloud';
import dotenv from 'dotenv';
import {
  validGetResponse,
  getKey,
  mockPostBody,
  incompleteRequestBody,
} from './mocks';

dotenv.config();

describe('Application-Wide', () => {
  // * 👇 Remember to set API_KEY_TEST in the `.env` file
  const { API_KEY_TEST } = process.env;
  const headers = { api_key: API_KEY_TEST };

  test("should return a 'Healthy' 200 status", async () => {
    const response = await api.get('/').invoke();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ message: 'Healthy' });
  });

  test('Should return a 404 for incorrect route or missing params', async () => {
    const badRoute = '/hey';
    const expectedResponse = {
      error: 'Incorrect route or missing params',
    };

    const response = await api
      .get(`/data/${getKey()}/${badRoute}`)
      .invoke(undefined, { headers });

    const responseTwo = await api
      .get(`/${badRoute}/${getKey()}`)
      .invoke(undefined, { headers });

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject(expectedResponse);
    expect(responseTwo.status).toBe(404);
    expect(responseTwo.body).toMatchObject(expectedResponse);
  });

  test('Should respond with an unauthorized error in case incorrect header is used', async () => {
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
});

describe('Main Endpoints', () => {
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
      expect(response.body).toHaveProperty('record');

      await data.remove(newKey);
    });

    it('Should return an error if the content object of the body is empty or non-existant', async () => {
      const requestBody = incompleteRequestBody;
      const expectedResponse = { message: 'Empty content key' };

      const response = await api
        .post('/data')
        .invoke(requestBody, { headers });

      expect(response.status).toBe(400);
      expect(response.body).toMatchObject(expectedResponse);
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

    it('Should output an error when trying to delete a record that no longer exists', async () => {
      const response = await api
        .delete(`/data/${keyName}`)
        .invoke(undefined, { headers });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Record does not exist',
      });
    });

    afterAll(async () => {
      const data = await api
        .get(`/data/${keyName}`)
        .invoke(undefined, { headers });

      expect(data.status).toBe(404);
      expect(data.body).toHaveProperty('message');
    });
  });
});
