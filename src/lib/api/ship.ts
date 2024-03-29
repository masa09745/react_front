import {client} from 'lib/api/client';

export const getShips = () => {
  return client.get('/ships');
};

export const getSelectShipData = (id:number | undefined) => {
  return client.get(`/ships/${id}`);
};
