import client from 'lib/api/client'

export const section = () => {
  return client.get('/sections');
}

export const role = ( id: string | undefined ) => {
  return client.get(`/sections/${id}/roles`)
}