import React, { useEffect } from 'react';

import type {ScheduleData} from "types/schedule"


import { TableRow, TableCell, TableHead, TableContainer, Paper} from "@mui/material"


export const ScheduleList: React.FC<ScheduleData> = (props) => {
  const {id, from, to, depTime, arrTime } = props



  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell align='right'> {from} </TableCell>
        <TableCell align='right'> {to} </TableCell>
        <TableCell align='right'> {depTime} </TableCell>
        <TableCell align='right'> {arrTime} </TableCell>
      </TableRow>
    </>
  )
}