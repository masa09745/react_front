import React, { useState, useEffect } from 'react';

import { ShipData } from 'interfaces/index';
import { ship } from 'lib/api/ship';

import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material"


export const Ship: React.FC = () => {
  const [ships, setShips] = useState<ShipData[]>([])

  useEffect (() => {
    ship().then ((res) => {
      console.log(res.data);
      setShips(res.data);
    })
  }, []);

  const shipList =  ships.map((ship) =>
    <Card
      key={ship.id}
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
  );

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
          {shipList}
        </Box>
        <Typography>
          ここに機材情報
        </Typography>
      </Box>
    </>
  )
}