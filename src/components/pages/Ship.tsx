import React from 'react';

import { Box, Typography} from "@mui/material";

import { ShipList } from "components/utils/ShipList"

import { ShipContextProvider } from "components/providers/ShipContextProvider"

export const Ship = () => {
 
  return(
    <>
      <ShipContextProvider>
        <Box>
          <Typography sx={{ mb:1 }}>
            機材一覧
          </Typography>
          <ShipList />
        </Box>
      </ShipContextProvider>
    </>
  )
}