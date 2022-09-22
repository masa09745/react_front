import { memo } from "react"

import { Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import { Link } from "react-router-dom"

import type { ShipData } from "types/ship";

type props = {
  ships: ShipData[]
}



export const ShipList = memo((props:props) => {
  console.log("ship listのレンダリング")
  const {ships} = props

  return(
    <>
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
                  <Link to={`${ship.id}`}>
                    {ship.regiNumber}
                  </Link>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}
      </Box>
    </>
)})