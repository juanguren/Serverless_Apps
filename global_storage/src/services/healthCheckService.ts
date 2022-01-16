import axios from 'axios';

const requestHealthEndpoint = async (url: string) => {
  const acceptedCode = 200;
  try {
    const response = await axios.get(`${url}/`);
    const isHealthy = response.status;
    if (isHealthy == acceptedCode) return true;

    throw {
      name: 'Global Array Error',
      message: `Warning: ${isHealthy} service status`,
    };
  } catch (error) {
    return error;
  }
};

export default requestHealthEndpoint;
