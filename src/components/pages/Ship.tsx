import React, { useState, useEffect } from 'react';

import { Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";

import { ship } from 'lib/api/ship';
import type { ShipData } from 'types/ship'

import { ShipDetails } from 'components/pages/ShipDetails'

export const Ship: React.FC = () => {
  const [ships, setShips] = useState<ShipData[]>([])
  const [selectShipId, setSelectShipId] = useState< string | undefined >("")
  const [selectShip, setSelectShip] = useState< string | undefined >("")
  const [isActive, setIsActive] = useState(false)

  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    setSelectShipId(e.currentTarget.dataset.id)
    setSelectShip(e.currentTarget.dataset.ship)
    setIsActive(true)
  };

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
            onClick={handleOnClick}
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