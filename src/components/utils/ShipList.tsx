import { ShipData } from 'interfaces/index'

import { Card, CardActionArea, CardContent, Typography } from "@mui/material"


export const ShipList: React.FC<ShipData> = props => {
  const { regiNumber } = props;

  const selectShip = () => {
    console.log(regiNumber)
  }

  return (
    <>
      <Card
        onClick={selectShip}
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
    </>
  )
}