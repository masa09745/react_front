import { memo } from "react"

import {
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import { Link, useLoaderData } from "react-router-dom"

import type { ShipData } from "types/ship";


export const ShipList = memo(() => {
  const ships = useLoaderData() as ShipData[]
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
          <Link to={`/ships/${ship.id}`} key={ship.id}>
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