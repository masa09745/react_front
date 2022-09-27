import type { MaintenanceData } from "./maintenance";

export type ShipData = {
  id: number
  regiNumber: string
};

export type SelectShip = {
  id: number
  regiNumber: string
  maintenances: MaintenanceData[]
};