import React from 'react';

import type {MaintenanceData} from "types/maintenance"


import { TableRow, TableCell} from "@mui/material"


export const MaintenanceList: React.FC<MaintenanceData> = (props) => {
  const {title, ata, description, priority, completed } = props



  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell sx={{minWidth:350}} align='center' > {title} </TableCell>
        <TableCell sx={{minWidth:350, whiteSpace:'normal', wordWrap: 'break-word'}} > {description} </TableCell>
        <TableCell align='center'> {ata} </TableCell>
        <TableCell align='center'> {priority} </TableCell>
        <TableCell align='center'> {completed} </TableCell>

      </TableRow>
    </>
  )
}