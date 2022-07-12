import React from 'react';

import type {ScheduleData} from "types/schedule"


import { TableRow, TableCell} from "@mui/material"


export const ScheduleList: React.FC<ScheduleData> = (props) => {
  const {flightNumber, from, to, depDate, depTime, arrDate, arrTime } = props

  

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell align='center'> {flightNumber} </TableCell>
        <TableCell align='center'> {from} </TableCell>
        <TableCell align='center'> {to} </TableCell>
        <TableCell align='center'> {depDate} </TableCell>
        <TableCell align='center'> {depTime} </TableCell>
        <TableCell align='center'> {arrDate} </TableCell>
        <TableCell align='center'> {arrTime} </TableCell>
      </TableRow>
    </>
  )
}