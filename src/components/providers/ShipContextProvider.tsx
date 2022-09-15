import React, { createContext, useState, useEffect } from "react";

import type { ShipData } from "types/ship";

import { ship } from 'lib/api/ship';


export const ShipContext = createContext({} as {
  ships: ShipData[],
  setShips: React.Dispatch<React.SetStateAction<ShipData[]>>
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
    <ShipContext.Provider value={{ ships, setShips, selectShipId, setSelectShipId, selectShip, setSelectShip, isActive, setIsActive}}>
      {props.children}
    </ShipContext.Provider>
  )
}