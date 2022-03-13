import axios from 'axios';

const getJsonApiData = async (references: number[]) => {
  const fetchData = async (element: number) => {
    const promise = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${element}`,
    );

    return promise.data;
  };

  const promises = references.map((element: number) =>
    fetchData(element),
  );

  const resolvedData = await Promise.all(promises);

  return resolvedData;
};

export default getJsonApiData;
