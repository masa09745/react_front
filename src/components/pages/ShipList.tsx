import { useContext } from "react"

import { Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";

import { ShipContext } from "components/providers/ShipContextProvider"

import { ShipDetails } from 'components/pages/ShipDetails'


export const ShipList = () => {

  const { ships, isActive,  setSelectShipId, setSelectShip, setIsActive } = useContext(ShipContext)


  const onClickSwitch = (e: React.MouseEvent<HTMLElement>) => {
    setSelectShip(e.currentTarget.dataset.ship)
    setSelectShipId(e.currentTarget.dataset.id)
    setIsActive(true)
  }

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
            onClick={onClickSwitch}
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
      {isActive? <ShipDetails /> : "機番を選んで下さい"}
    </>
)
}