import { api, data, schedule, params } from '@serverless/cloud';
import { handleData } from './src/dataHandler';
import { isKeyNameDuplicated } from './src/validators';
import AcceptedData from './src/interfaces/dataToStore';

api.get('/', (req, res) =>
  res.status(200).json({ message: 'Healthy' }),
);

api.get('/data/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const response = await data.get(key);
    if (response) return res.status(200).json({ response });
    throw {
      message: `No data associated with the ${key} key`,
      code: 404,
    };
  } catch (error) {
    const { message, code } = error;
    return res.status(code || 500).json({ message });
  }
});

api.post('/data', async (req, res) => {
  const { content, instructions } = req.body;
  const { keyName } = instructions;
  try {
    if (content || content.length > 0) {
      const data: AcceptedData = {
        content,
        instructions,
      };
      if (isKeyNameDuplicated(keyName)) {
        throw {
          message: `An entry with the key ${keyName} already exists`,
          code: 403,
        };
      }
      await handleData(req, res, data);
    } else {
      throw { message: 'Empty content key' };
    }
  } catch (error) {
    const { message, code = 400 } = error;
    return res.status(code).json({ message });
  }
});

// Redirect to save's endpoint
api.post('/*', (req, res) => {
  res.redirect('/');
});

api.use((_req, res) => {
  res
    .status(404)
    .json({ error: 'Incorrect route or missing params' });
});
