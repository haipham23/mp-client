const isProd = process.env.REACT_APP_BUILD_ENV === 'production';

const config = {
  musicApi: isProd
    ? process.env.REACT_APP_MUSIC_API_PROD
    : process.env.REACT_APP_MUSIC_API_DEV
};

export default config;
