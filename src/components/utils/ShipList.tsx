import { memo } from "react"

import {
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom"

import type { ShipData } from "types/ship";

type props = {
  ships: ShipData[]
}

export const ShipList = memo((props:props) => {
  const {ships} = props
  console.log("ship listのレンダリング")

  return(
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap:" wrap",
          gap: 2,
          mb: 3,
          px: 2,
        }}
      >
        {ships.map((ship) =>
          <Link to={`/ships/${ship.id}`} key={ship.id} state={{id: ship.id, selectShip: ship.regiNumber}}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                    {ship.regiNumber}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        )}
      </Box>

    </>
)})