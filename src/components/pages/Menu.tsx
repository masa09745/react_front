import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';

export const Menu: React.FC = () => {
  const menuArr = [
    {name: "機材", description: "機材情報"},
    {name: "スケジュール", description: "スケジュール管理"}]
  

  const menuList = menuArr.map((menu) =>
    <Card key={menu.name} sx={{width: 250}} >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
            {menu.name}
          </Typography>
          <Typography sx={{ m:1.5}} color="text.secondary">
            {menu.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );


  return(
    <>
      <Box
        sx={{
          display:'flex',
          gap: 3,
        }}
      >
        {menuList}
      </Box>
    </>

  )
}
