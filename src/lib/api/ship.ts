import client from 'lib/api/client';

export const ship = () => {
  return client.get('/ships');
};

export const maintenance = (id: string | undefined) => {
  return client.get(`ships/${id}/maintenances`)
}