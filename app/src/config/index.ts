export const Config = {
  environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  api: {
    url: process.env.REACT_APP_API_PUBLIC_URL || 'http://localhost:3000',
    timeout: Number(process.env.REACT_APP_API_TIMEOUT) || 3000,
  },
};
