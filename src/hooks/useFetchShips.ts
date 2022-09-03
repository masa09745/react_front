import { useState, useEffect } from "react"

import { ship } from 'lib/api/ship';

import type { ShipData } from 'types/ship'


export const useFetchShips = () => {
  const [ships, setShips] = useState<ShipData[]>([])
  const [selectShipId, setSelectShipId] = useState< string | undefined >("")
  const [selectShip, setSelectShip] = useState< string | undefined >("")
  const [isActive, setIsActive] = useState(false)

  const onClickSelectShips = (e: React.MouseEvent<HTMLElement>) =>{
    setSelectShipId(e.currentTarget.dataset.id)
    setSelectShip(e.currentTarget.dataset.ship)
    setIsActive(true)
  }

  useEffect (() => {
    const fetchShip = async () => {
      const res =  await ship();
      setShips(res.data);
    };
    fetchShip();
  }, []);



  return { ships,selectShipId, selectShip, isActive, onClickSelectShips };
}