import React, { memo, useState, useEffect } from "react"

import {
  Box,
  Typography,
  Button
} from "@mui/material"

import {useLocation, Link, Outlet } from "react-router-dom"
import { DetailList } from "components/utils/DetailList";
 
import { getSelectShipData } from 'lib/api/ship'

import type {MaintenanceData} from "types/maintenance"


type State = {
  id: number | undefined,
  selectShip: string | undefined
}

export const ShipDetails = memo(() => {
  const location = useLocation()
  const {id, selectShip } = location.state as State
  const [maintenances, setMaintenances] = useState<MaintenanceData[]>([])


  useEffect (() => {
    const fetchMaintenance = async () => {
      const res = await getSelectShipData(id);
      setMaintenances(res.data.maintenances)
    };
    fetchMaintenance();
  }, [id])

  console.log("ship detailのレンダリング")

  return(
    <>
      <Box>
        <Typography variant="h5" component="h5" sx={{mb:1}}>整備情報</Typography>
        <Typography variant="h6" component="div" sx={{px:1}}>
          <div>
            選択中の機番 : {selectShip}
          </div>
          <Link to={`create`} state={{id: id, selectShip: selectShip}}>
            <Button variant="contained">新規作成</Button>
          </Link>
        </Typography>
      </Box>
      {maintenances.length === 0? <Box component="div" sx={{mt:1, px:1}}>整備情報はありません</Box>:<DetailList maintenances={maintenances} />}
    </>
  )
})