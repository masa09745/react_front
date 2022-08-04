import client from 'lib/api/client'

export const GetSection = () => {
  return client.get('/sections');
}

export const GetRole = ( id: string | undefined ) => {
  return client.get(`/sections/${id}/roles`)
}