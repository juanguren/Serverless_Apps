import { api, data, schedule, params } from '@serverless/cloud';
import { postDataHandler } from './src/controllers/dataHandler';
import {
  getExistingKey,
  validateUserToken,
  userKeyGuard,
} from './src/controllers/validators';
import {
  AcceptedData,
  DataAction,
} from './src/interfaces/dataInterfaces';
import { removeTokenFromPayload } from './src/utils/utils';

// Application-level middleware
api.use(validateUserToken);

api.get('/', (req, res) =>
  res.status(200).json({ message: 'Healthy' }),
);

api.get('/data/:key', userKeyGuard, async (req, res) => {
  const { key } = req.params;
  try {
    const response = await data.get(key);
    if (response) {
      const payload = removeTokenFromPayload(response);
      return res.status(200).json({ data: payload });
    }
    throw {
      message: `No data associated with the ${key} key`,
      code: 404,
    };
  } catch (error) {
    const { message, code } = error;
    return res.status(code || 500).json({ message });
  }
});

api.post('/data', userKeyGuard, async (req, res) => {
  const { content, instructions } = req.body;
  const { keyName } = instructions;
  let action: DataAction = DataAction.CREATE;

  try {
    if (content || content.length > 0) {
      const data: AcceptedData = {
        content,
        instructions,
      };
      if (await getExistingKey(keyName)) action = DataAction.UPDATE;

      return await postDataHandler(req, res, data, action);
    } else {
      throw { message: 'Empty content key' };
    }
  } catch (error) {
    const { message, code = 400 } = error;
    return res.status(code).json({ message });
  }
});

api.delete('/data/:key', userKeyGuard, async (req, res) => {
  const { key: keyName } = req.params;
  try {
    const response = await data.remove(keyName);
    if (response)
      return res
        .status(200)
        .json({ message: 'Entry deleted succesfully' });
    throw 'Server error';
  } catch (error) {
    res.status(500).json(error);
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
