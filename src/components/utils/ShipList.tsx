import { ShipData } from 'interfaces/index'

import { Card, CardActionArea, CardContent, Typography } from "@mui/material"


export const ShipList = (props:ShipData) => {
  const { id, regiNumber } = props;

  return (
    <Card
      sx={{
        width:100,
        textDecoration:"none",
        textAlign: "center"
      }}
    >
    <CardActionArea>
      <CardContent>
        <Typography variant="h6" component="div">
          {regiNumber}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}