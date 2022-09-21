import React, { useContext, useEffect, useState, memo, useCallback } from "react"

import { Box, Typography, Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, Button} from "@mui/material"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { getMaintenance } from 'lib/api/ship'
import { deleteMaintenance } from "lib/api/maintenance"

import {AuthContext} from "components/providers/AuthContextProvider"

import type { MaintenanceData } from "types/maintenance"



type props = {
  selectShip?: string
  selectShipId?: string
  handleOpen: (e: React.MouseEvent<HTMLElement>) => void
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShipDetails =memo((props: props) => {
  console.log("ship detailのレンダリング")
  const { selectShip, selectShipId, handleOpen, open, setOpen } = props
  const { currentUser } =useContext(AuthContext)
  

  const [maintenanceData, setMaintenanceData]  = useState<MaintenanceData>()
  const [maintenances, setMaintenances] = useState<MaintenanceData[]>([])



  const onEditClick = useCallback((data: MaintenanceData) =>{
    setMaintenanceData(data)
    setOpen(true)
  },[maintenanceData])

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



  return(
    <>
      <Box>
        <Typography sx={{mb:1}}>整備情報</Typography>
        <span>機番 : {selectShip}</span>
      </Box>
      <Box>
        <Button onClick={handleOpen}>新規作成</Button>
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
})