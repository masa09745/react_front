import React, { createContext, useState, useEffect } from "react";

import type { ShipData } from "types/ship";
import type { MaintenanceData } from "types/maintenance"


import { ship } from 'lib/api/ship';



export const ShipContext = createContext({} as {
  ships: ShipData[],
  setShips: React.Dispatch<React.SetStateAction<ShipData[]>>
  maintenances: MaintenanceData[],
  setMaintenances: React.Dispatch<React.SetStateAction<MaintenanceData[]>>
  selectShipId: string | undefined
  setSelectShipId: React.Dispatch<React.SetStateAction<string | undefined>>
  selectShip: string | undefined
  setSelectShip: React.Dispatch<React.SetStateAction<string | undefined>>
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
});

type props = {
  children: React.ReactNode
}

export const ShipContextProvider = (props:props) => {
  
  const [ ships, setShips ] = useState<ShipData[]>([])
  const [maintenances, setMaintenances] = useState<MaintenanceData[]>([])

  const [selectShipId, setSelectShipId] = useState< string | undefined >("")
  const [selectShip, setSelectShip] = useState< string | undefined >("")
  const [isActive, setIsActive] = useState<boolean>(false)


  useEffect (() => {
    const fetchShip = async () => {
      const res =  await ship();
      setShips(res.data);
    };
    fetchShip();
  }, []);


  return (
    <ShipContext.Provider value={{ ships, setShips, maintenances, setMaintenances, selectShipId, setSelectShipId, selectShip, setSelectShip, isActive, setIsActive}}>
      {props.children}
    </ShipContext.Provider>
  )
}