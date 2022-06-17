import React, { useState, useEffect } from 'react';

import { ShipData } from 'interfaces/index';
import { ship } from 'lib/api/ship';

import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material"

import { ShipList } from 'components/utils/ShipList'


export const Ship: React.FC = () => {
  const [ships, setShips] = useState<ShipData[]>([])

  useEffect (() => {
    ship().then ((res) => {
      console.log(res.data);
      setShips(res.data);
    })
  }, []);

  return (
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
          {ships.map(ship => (
            <ShipList key={ship.id} id={ship.id} regiNumber={ship.regiNumber} />
          ))}
        </Box>
        <Typography>
          ここに機材情報
        </Typography>
      </Box>
    </>
  )
}