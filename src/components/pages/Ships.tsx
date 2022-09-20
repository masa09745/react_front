import React, {useState, useEffect, memo, useCallback} from 'react';

import { Box, Typography} from "@mui/material";

import { ShipList } from "components/utils/ShipList"
import { ShipDetails } from 'components/utils/ShipDetails'
import {FormModal} from 'components/utils/FormModal'

import { ship } from 'lib/api/ship';

import type { ShipData } from "types/ship";
import type { MaintenanceData } from "types/maintenance"


export const Ships = memo(() => {
  console.log("shipのレンダリング")
  const [ships, setShips] = useState<ShipData[]>([])
  const [selectShipId, setSelectShipId] = useState< string | undefined >("")
  const [selectShip, setSelectShip] = useState< string | undefined >("")
  const [maintenances, setMaintenances] = useState<MaintenanceData[]>([])
  const [maintenanceData, setMaintenanceData]  = useState<MaintenanceData>()
  const [isActive, setIsActive] = useState<boolean>(false)
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);




  const onClickSwitch = useCallback((e: React.MouseEvent<HTMLElement>) =>{
    setSelectShip(e.currentTarget.dataset.ship)
    setSelectShipId(e.currentTarget.dataset.id)
    setIsActive(true)
  }, [])

  useEffect (() => {
    const fetchShip = async () => {
      const res =  await ship();
      setShips(res.data)
    };
    fetchShip();
  },[]);

  return(
    <>
      <Box>
        <Typography sx={{ mb:1 }}>
          機材一覧
        </Typography>
        <ShipList ships={ships} onClickSwitch={onClickSwitch} />
        {isActive? <ShipDetails open={open} setOpen={setOpen} selectShip={selectShip} selectShipId={selectShipId} handleOpen={handleOpen} /> : <p>機番を選んで下さい</p>}
        <FormModal open={open} setOpen={setOpen} data={maintenanceData} selectShip={selectShip} selectShipId={selectShipId} setMaintenances={setMaintenances} />
      </Box>
    </>
  )
})