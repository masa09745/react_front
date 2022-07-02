import React from 'react';

import type {ScheduleData} from "types/schedule"


import { TableRow, TableCell} from "@mui/material"


export const ScheduleList: React.FC<ScheduleData> = (props) => {
  const {from, to, depDate, depTime, arrDate, arrTime } = props

  

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell align='right'> {from} </TableCell>
        <TableCell align='right'> {to} </TableCell>
        <TableCell align='right'> {depDate} </TableCell>
        <TableCell align='right'> {depTime} </TableCell>
        <TableCell align='right'> {arrDate} </TableCell>
        <TableCell align='right'> {arrTime} </TableCell>
      </TableRow>
    </>
  )
}