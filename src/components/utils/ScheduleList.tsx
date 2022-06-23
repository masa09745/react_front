import React, { useEffect } from 'react';

import type {ScheduleData} from "types/schedule"


import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper} from "@mui/material"


export const ScheduleList: React.FC<ScheduleData> = (props) => {
  const {id, from, to, depTime, arrTime } = props

  return (
    <>
      <div>{id}</div>
      <div> {from} - {to}</div>
      {depTime} {arrTime}
    </>
  )
}