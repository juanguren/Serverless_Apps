import { api } from '@serverless/cloud';

test("should return a 'Healthy' 200 status", async () => {
  const response = await api.get('/').invoke();

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({ message: 'Healthy' });

  /*expect(body).toHaveProperty('users');
  expect(body.users.length).toBeGreaterThan(0);*/
});
