import React, { useContext, useEffect, useState } from "react"

import { Box, Typography } from "@mui/material";

import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper} from "@mui/material"

import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {FormModal} from 'components/utils/FormModal'


import { getMaintenance } from 'lib/api/ship'

import { ShipContext } from "components/providers/ShipContextProvider"
import {AuthContext} from "components/providers/AuthContextProvider"

import { editMaintenance } from "lib/api/maintenance"
import { deleteMaintenance } from "lib/api/maintenance"
import type { MaintenanceData } from "types/maintenance"




export const ShipDetails = () => {

  const { selectShip, selectShipId, maintenances, setMaintenances} = useContext(ShipContext)
  const { currentUser } =useContext(AuthContext)
  const [open, setOpen] = useState(false);

  const [maintenanceData, setMaintenanceData]  = useState<MaintenanceData>()

  const handleOpen = () => setOpen(true);


 

  const onEditClick = (data: MaintenanceData) =>{
    setMaintenanceData(data)
    setOpen(true);
  }

  const onDeleteClick = async (id:number) => {
    const res = await deleteMaintenance(id)
    if (res?.status === 204) {
      const res = await getMaintenance(selectShipId);
      setMaintenances(res.data)
    }
    console.log("Delete btn clicked")
  }

  useEffect (() => {
    const fetchMaintenance = async () => {
      const res = await getMaintenance(selectShipId);
      setMaintenances(res.data)

    };
    fetchMaintenance();
  }, [selectShipId])

  useEffect (() => {
    setMaintenanceData(undefined)
  },[handleOpen])

  return(
    <>
      <Box>
        <Typography sx={{mb:1}}>整備情報</Typography>
        <span>機番 : {selectShip}</span>
      </Box>
      <Box>
        <Button onClick={handleOpen}>新規作成</Button>
        <FormModal open={open} setOpen={setOpen} data={maintenanceData} />
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
                      <TableCell sx={{minWidth:100}}>
                        {currentUser?.section === "整備部"? <EditIcon sx={{mr:1}} onClick={()=>{onEditClick(maintenance)}}></EditIcon>:<VisibilityIcon></VisibilityIcon>}
                        {currentUser?.id === maintenance.userId? <DeleteIcon onClick={() => {{onDeleteClick(maintenance.id)}}}></DeleteIcon>: ""}
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