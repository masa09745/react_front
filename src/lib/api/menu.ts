import client from "lib/api/client";

export const menu = () => {
  return client.get('/menu')
}
