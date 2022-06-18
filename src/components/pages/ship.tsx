import React, { useState, useEffect } from 'react';

import { ShipData } from 'interfaces/index';
import { ship } from 'lib/api/ship';

import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";


import { ShipList } from 'components/utils/ShipList'
import { ShipDetails } from 'components/pages/ShipDetails'


export const Ship: React.FC = () => {
  const [ships, setShips] = useState<ShipData[]>([])
  const [selectShip, setSelectShip] = useState("")

  useEffect (() => {
    const fetchShip = async () => {
      const res =  await ship();
      setShips(res.data);
    };
    fetchShip();
  }, []);

  return(
    <>
      <Box>
        <Typography sx={{ mb:1}}>
          機材一覧
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap:" wrap",
            gap: 2,
            mb: 5,
          }}
        >
          {ships.map((ship) =>
            <Card
            key={ship.id}
            onClick={() => setSelectShip(ship.regiNumber)}
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
      <Typography>
        機材情報
      </Typography>
        <Box>
          {selectShip}
        </Box>
    </>
  )
}