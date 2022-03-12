import { Request, Response } from '@serverless/cloud';
import axios from 'axios';

const getJsonApiData = async (req: Request, res: Response) => {
  const fetchData = async (element: number) => {
    const promise = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${element}`,
    );

    return promise.data;
  };
  const iterable = [1, 10, 5, 3];

  const promises = iterable.map((element: number) =>
    fetchData(element),
  );

  const resolvedData = await Promise.all(promises);

  res.send(resolvedData);
};

export default getJsonApiData;
