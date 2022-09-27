import {client} from 'lib/api/client'

import type { InputMaintenance } from 'types/maintenance'

export const createMaintenance = (data: InputMaintenance) =>{
  return client.post("maintenances", data)
}

export const updateMaintenance = (id:number | undefined,  data:InputMaintenance) =>{
  return client.put(`maintenances/${id}`, data)
}

export const deleteMaintenance = (id:number | undefined) =>{
  return (
    client.delete(`maintenances/${id}`)
  )
}