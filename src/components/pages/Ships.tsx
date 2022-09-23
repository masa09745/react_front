import React, { memo } from 'react';

import { Box, Typography} from "@mui/material";
import { Outlet } from "react-router-dom"

import { ShipList } from "components/utils/ShipList"

import { getShips } from 'lib/api/ship';

import type { ShipData } from "types/ship";


export const shipsLoader = async():Promise<ShipData> => {
  const res = await getShips()
  const ships = res.data

  return ships

}

export const Ships = memo(() => {

  console.log("shipのレンダリング")

  return(
    <>
      <Box>
        <Typography sx={{ mb:1 }}>
          機材一覧
        </Typography>
        <ShipList />
        <Outlet />
      </Box>
    </>
  )
})