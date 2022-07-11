import React from 'react';

import type {MaintenanceData} from "types/maintenance"


import { TableRow, TableCell} from "@mui/material"


export const MaintenanceList: React.FC<MaintenanceData> = (props) => {
  const {date, ata, title, description } = props

  

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell align='center'> {date} </TableCell>
        <TableCell align='center'> {ata} </TableCell>
        <TableCell align='center'> {title} </TableCell>
        <TableCell align='center'> {description} </TableCell>

      </TableRow>
    </>
  )
}