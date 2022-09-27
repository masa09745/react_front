import React, { useState,useEffect, memo } from 'react';

import { Box, Typography} from "@mui/material";
import { Outlet } from "react-router-dom"

import { ShipList } from "components/utils/ShipList"

import { getShips } from 'lib/api/ship';

import type { ShipData } from "types/ship";


export const Ships = memo(() => {
  const [ships, setShips] = useState<ShipData[]>([])

  useEffect (() => {
    const fetchShip = async () => {
      const res =  await getShips();
      setShips(res.data)
    };
    fetchShip();
  }, [])

  console.log("shipのレンダリング")

  return(
    <>
      <Box>
        <Typography variant="h5" component="h5" sx={{ mb:1 }}>
          機材一覧
        </Typography>
        <ShipList ships={ships} />
        <Outlet />
      </Box>
    </>
  )
})