const getKey = (isMock = true) => {
  if (isMock) return 'testKey';
  return 'yeet';
};

const validGetResponse = {
  data: {
    test: 'Once moree',
    test2: [
      {
        user: 'Juan',
      },
    ],
  },
};

const incompleteRequestBody = {
  content: {},
  instructions: {
    keyName: 'testKey199_',
    overwrite: true,
  },
};

const mockPostBody = (key: string) => {
  return {
    content: {
      test: 'wohooo',
      test2: [
        {
          user: 'Juan',
        },
      ],
    },
    instructions: {
      keyName: key,
      overwrite: true,
    },
  };
};

export {
  getKey,
  mockPostBody,
  validGetResponse,
  incompleteRequestBody,
};
