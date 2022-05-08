import React from 'react';
import Typography from "@mui/material/Typography"


export const Footer:React.FC =() => {
  return(
    <Typography sx={{color: 'white', backgroundColor:'gray', width: "100%", position: 'absolute', bottom: 0, textAlign:'center'}}>
      Copyright : Masahide Higashi 2022
    </Typography>
  );
}
