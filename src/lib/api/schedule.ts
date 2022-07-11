import client from 'lib/api/client';

export const schedule = (id: string | undefined) => {
  return client.get(`ships/${id}/schedules`)
}