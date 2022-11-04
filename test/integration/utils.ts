import got from 'got';

export const getInstance = () => {
  return got.extend({
    responseType: 'json',
    prefixUrl: 'http://localhost:3000/',
  });
};
