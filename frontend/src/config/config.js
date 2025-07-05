const config = {
  development: {
    API_URL: 'http://localhost:8000',
  },
  production: {
    API_URL: process.env.REACT_APP_API_URL || 'https://your-backend-url.vercel.app',
  },
};

const currentConfig = config[process.env.NODE_ENV] || config.development;

export default currentConfig; 