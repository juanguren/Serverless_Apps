import { api, data, schedule, params } from '@serverless/cloud';
import { handleData } from './src/handleData';
import AcceptedData from './src/interfaces/dataToStore';

// Create GET route and return users
api.post('/save', async (req, res) => {
  const { content, instructions } = req.body;
  try {
    if (content || content.length > 0) {
      const data: AcceptedData = {
        content,
        instructions,
      };
      await handleData(req, res, data);
    } else {
      throw 'Empty content key';
    }
  } catch (error) {
    const code = error.statusCode || 500;
    const message = 'Error';
    return res.status(code).json({ message, error });
  }
});

// Redirect to save's endpoint
api.post('/*', (req, res) => {
  res.redirect('/save');
});
