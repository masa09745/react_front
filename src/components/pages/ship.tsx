import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material"


export const Ship: React.FC = () => {
  const shipArr = [
    {name: "JA01MJ"},
    {name: "JA02MJ"},
    {name: "JA03MJ"},
    {name: "JA04MJ"},
    {name: "JA05MJ"},
  ]

  const shipList =  shipArr.map((ship) =>
    <Card
      key={ship.name}
      sx={{
        width:100,
        textDecoration:"none",
        textAlign: "center"
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" component="div">
            {ship.name}
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