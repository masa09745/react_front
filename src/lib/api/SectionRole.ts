import client from 'lib/api/client'

export const getSection = () => {
  return client.get('/sections');
}

export const getRole = ( id: string | undefined ) => {
  return client.get(`/sections/${id}/roles`)
}