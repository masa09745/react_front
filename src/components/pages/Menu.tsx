import React from "react";

import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';

import { Link } from "react-router-dom"

export const Menu: React.FC = () => {
  const menuArr = [
    {name: "機材", description: "機材情報", link:"/ship" },
    {name: "スケジュール", description: "スケジュール管理", link:"/schedule"}]
  

  const menuList = menuArr.map((menu) =>
    <Card component={Link} to={menu.link} key={menu.name} sx={{width: 250, textDecoration:"none"}} >
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div" >
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
