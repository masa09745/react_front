import React, {useState, useEffect, memo, useCallback} from 'react';

import { Box, Typography} from "@mui/material";
import { Outlet } from "react-router-dom"

import { ShipList } from "components/utils/ShipList"
import { ShipDetails } from 'components/utils/ShipDetails'
import {FormModal} from 'components/utils/FormModal'

import { getShips } from 'lib/api/ship';

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




  useEffect (() => {
    const fetchShip = async () => {
      const res =  await getShips();
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
        <ShipList ships={ships} />
        <Outlet />
      </Box>
    </>
  )
})