import React, { useState } from 'react';

import { Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";

import { useFetchShips } from 'hooks/useFetchShips'
import { ShipDetails } from 'components/pages/ShipDetails'

export const Ship: React.FC = () => {
  
  const { ships, selectShipId, selectShip, isActive, onClickSelectShips } = useFetchShips()

  return(
    <>
      <Box>
        <Typography sx={{ mb:1 }}>
          機材一覧
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap:" wrap",
            gap: 2,
            mb: 5,
            px: 2,
          }}
        >
          {ships.map((ship) =>
            <Card
            key={ship.id}
            onClick={onClickSelectShips}
            data-id={ship.id}
            data-ship={ship.regiNumber}
            sx={{
              width:100,
              textDecoration:"none",
              textAlign: "center"
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6" component="div">
                  {ship.regiNumber}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          )}
        </Box>
      </Box>
      {isActive? <ShipDetails id={selectShipId} selectShip={selectShip} /> : "機番を選んで下さい"}
    </>
  )
}