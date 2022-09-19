import client from 'lib/api/client'

import type { InputMaintenance } from 'types/maintenance'

export const createMaintenance = (data: InputMaintenance) =>{
  return client.post("maintenances", data)
}

export const editMaintenance = (id:number | undefined) =>{
  return client.get(`maintenances/${id}`)
}

export const deleteMaintenance = (id:number | undefined) =>{
  return client.delete(`maintenances/${id}`)
}