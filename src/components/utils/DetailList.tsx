import React, { useContext, useState } from 'react';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import {useNavigate} from "react-router-dom"
import { FormModal } from 'components/utils/FormModal';
import { ShowModal } from 'components/utils/ShowModal';

import type { MaintenanceData } from 'types/maintenance'

import {AuthContext} from "components/providers/AuthContextProvider"
import { deleteMaintenance } from "lib/api/maintenance"

type props = {
  maintenances: MaintenanceData[]
}


export const DetailList = (props:props) => {
  const {maintenances} = props
  const { currentUser } = useContext(AuthContext)
  const [open, setOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [maintenance, setMaintenance] = useState<MaintenanceData>()
  const navigate = useNavigate()

  const handleShow =() =>{
    setModalOpen(true)
  }

  const handleEdit = (data:MaintenanceData) => {
    setMaintenance(data)
    setOpen(true)
  }

  const handleDelete = async (id:number) => {
    const res = await deleteMaintenance(id)
    if (res?.status === 204) {
      navigate('/ships')
    }
    console.log("Delete btn clicked")
  }

  return(
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >Action</TableCell>
              <TableCell >Title</TableCell>
              <TableCell >Description</TableCell>
              <TableCell align='center'>ATA</TableCell>
              <TableCell align='center'>Priority</TableCell>
              <TableCell align='center'>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenances.map((maintenance) =>{
              return(
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={maintenance.id} >
                  <TableCell sx={{minWidth:150}}>
                    <VisibilityIcon sx={{mr:1}} onClick={()=>handleShow()} />
                    {currentUser?.section === "整備部"? <EditIcon sx={{mr:1}} onClick={()=>handleEdit(maintenance)} />:""}
                    {currentUser?.id === maintenance.userId? <DeleteIcon onClick={()=>handleDelete(maintenance.id)} />: ""}
                  </TableCell>
                  <TableCell sx={{minWidth:350}} > {maintenance.title} </TableCell>
                  <TableCell sx={{minWidth:350, whiteSpace:'normal', wordWrap: 'break-word'}} > {maintenance.description} </TableCell>
                  <TableCell align='center'> {maintenance.ata} </TableCell>
                  <TableCell align='center'> {maintenance.priority} </TableCell>
                  { maintenance.completed === true? <TableCell align='center'><CheckIcon /></TableCell> : <TableCell></TableCell>}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <FormModal open={open} setOpen={setOpen} maintenance={maintenance}/>
      <ShowModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  )
}