import React, {useContext} from 'react';

import type {MaintenanceData} from "types/maintenance"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {AuthContext} from "components/providers/AuthContextProvider"

import { TableRow, TableCell} from "@mui/material"


export const MaintenanceList: React.FC<MaintenanceData> = (props) => {
  const {title, ata, description, priority, completed, shipId, userId } = props

  const {currentUser} =useContext(AuthContext)

  const onEditClick = () => {
    console.log("Edit btn clicked")
  }

  const onDeleteClick = () => {
    console.log("Delete btn clicked")
  }

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
        <TableCell sx={{minWidth:100}} align="center">
          {currentUser?.section === "整備部"? <EditIcon sx={{mr:1}} onClick={onEditClick}></EditIcon>:<VisibilityIcon></VisibilityIcon>}
          {currentUser?.id === userId? <DeleteIcon onClick={onDeleteClick}></DeleteIcon>: ""}
        </TableCell>
        <TableCell sx={{minWidth:350}} align='center' > {title} </TableCell>
        <TableCell sx={{minWidth:350, whiteSpace:'normal', wordWrap: 'break-word'}} > {description} </TableCell>
        <TableCell align='center'> {ata} </TableCell>
        <TableCell align='center'> {priority} </TableCell>
        <TableCell align='center'> {completed} </TableCell>

      </TableRow>
    </>
  )
}