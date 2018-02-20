// const isProd = process.env.REACT_APP_BUILD_ENV === 'production';

const config = {
  musicApi: process.env.REACT_APP_MUSIC_API,
  socketHost: process.env.REACT_APP_SOCKET_HOST,
  socketPort: process.env.REACT_APP_SOCKET_PORT
};

export default config;
