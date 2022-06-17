import client from 'lib/api/client';

export const ship = () => {
  return client.get('/ships');
};