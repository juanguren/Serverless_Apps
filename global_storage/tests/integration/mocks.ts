const getKey = (isMock = true) => {
  if (isMock) return 'testKey';
  return 'yeet';
};

const validGetResponse = {
  data: {
    test: 'wohooo',
    test2: [
      {
        user: 'Juan',
      },
    ],
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

export { getKey, mockPostBody, validGetResponse };
