import client from 'lib/api/client';

export const getShips = () => {
  return client.get('/ships');
};

export const selectShip = (id:string | undefined) => {
  return client.get(`/ships/${id}`);
};
