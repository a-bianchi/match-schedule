export const Config = {
  api: {
    url: process.env.REACT_APP_API_PUBLIC_URL || 'http://localhost:3000/api/v1',
    timeout: Number(process.env.REACT_APP_API_TIMEOUT) || 3000,
  },
};
