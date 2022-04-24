import React from 'react'
import Typography from "@mui/material/Typography"

const Footer = () => {
  return(
    <Typography sx={{color: 'white', backgroundColor:'gray', width: "100%", position: 'absolute', bottom: 0, textAlign:'center'}}>
      Copyright : Masahide Higashi 2022
    </Typography>
  )
}

export default Footer