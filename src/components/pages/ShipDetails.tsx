import React, { useContext, memo, useState } from "react"

import {
  Box,
  Typography,
  Button
} from "@mui/material"



import { useLoaderData, LoaderFunctionArgs, Link } from "react-router-dom"
import { DetailList } from "components/utils/DetailList";
 
import { selectShip } from 'lib/api/ship'
import { deleteMaintenance } from "lib/api/maintenance"

import type { SelectShip } from "types/ship"
import { CreateMaintenance } from "./CreateMaintenance";


export const detailLoader = async ({params}: LoaderFunctionArgs): Promise<SelectShip> => {
  const res = await selectShip(params.id);
  const ship = res.data
  return ship
}



export const ShipDetails = memo(() => {
  const ship = useLoaderData() as SelectShip




  console.log("ship detailのレンダリング")

  return(
    <>
      <Box>
        <Typography variant="h5" component="h5" sx={{mb:1}}>整備情報</Typography>
        <Typography variant="h6" component="div" sx={{px:1}}>
          <div>
            選択中の機番 : {ship.regiNumber}
          </div>
          <Link to={`/ships/${ship.id}/create`}>
            <Button variant="contained">新規作成</Button>
          </Link>
        </Typography>

      </Box>
      
      {ship.maintenances.length === 0? <Box component="div" sx={{mt:1, px:1}}>整備情報はありません</Box>:<DetailList maintenances={ship.maintenances} />}
    </>
  )
})