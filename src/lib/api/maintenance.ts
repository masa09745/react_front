import client from 'lib/api/client'

import type { InputMaintenance } from 'types/maintenance'

export const createMaintenance = (data: InputMaintenance) =>{
  return client.post("maintenances", data)

}