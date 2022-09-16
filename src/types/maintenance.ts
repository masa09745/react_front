export type MaintenanceData = {
  id: number
  date: string
  ata: string
  title: string
  description: string
}

export type InputMaintenance = {
  mode: string
  title: string
  ATA: string
  MaintenanceMessage: string
  Checkbox: boolean
  Select: number
  description: string
  shipId: string
  userId: number | undefined
}