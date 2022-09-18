import React, { useContext, useEffect, useState } from "react"

import { Box, Typography } from "@mui/material";

import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper} from "@mui/material"


import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {BasicModal} from 'components/utils/Modal'


import { maintenance } from 'lib/api/ship'

import { ShipContext } from "components/providers/ShipContextProvider"
import {AuthContext} from "components/providers/AuthContextProvider"

import { deleteMaintenance } from "lib/api/maintenance"
import type { MaintenanceData } from "types/maintenance"




export const ShipDetails = () => {

  const { selectShip, selectShipId } = useContext(ShipContext)
  const [maintenances, setMaintenance] = useState<MaintenanceData[]>([])

  const {currentUser} =useContext(AuthContext)

  const onEditClick = () => {
    console.log("Edit btn clicked")
  }
  const onDeleteClick = () => {
  }

  useEffect (() => {
    const fetchMaintenance = async () => {
      const res = await maintenance(selectShipId);
      setMaintenance(res.data)
    };
    fetchMaintenance();
  }, [selectShipId])

  return(
    <>
      <Box>
        <Typography sx={{mb:1}}>整備情報</Typography>
        <span>機番 : {selectShip}</span>
      </Box>
      <Box>
        <BasicModal />
        <Box sx={{width: '100%', typography:'body1'}}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Action</TableCell>
                  <TableCell align='center'>Title</TableCell>
                  <TableCell align='center'>Description</TableCell>
                  <TableCell align='center'>ATA</TableCell>
                  <TableCell align='center'>Priority</TableCell>
                  <TableCell align='center'>Completed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maintenances.map((maintenance) =>{
                  return(
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={maintenance.id} >
                    <TableCell sx={{minWidth:100}} align="center">
                      {currentUser?.section === "整備部"? <EditIcon sx={{mr:1}} onClick={onEditClick}></EditIcon>:<VisibilityIcon></VisibilityIcon>}
                      {currentUser?.id === maintenance.userId? <DeleteIcon onClick={onDeleteClick}></DeleteIcon>: ""}
                    </TableCell>
                    <TableCell sx={{minWidth:350}} align='center' > {maintenance.title} </TableCell>
                    <TableCell sx={{minWidth:350, whiteSpace:'normal', wordWrap: 'break-word'}} > {maintenance.description} </TableCell>
                    <TableCell align='center'> {maintenance.ata} </TableCell>
                    <TableCell align='center'> {maintenance.priority} </TableCell>
                    <TableCell align='center'> {maintenance.completed} </TableCell>
                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  )
}