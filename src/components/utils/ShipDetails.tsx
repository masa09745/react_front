import React, { useContext, memo } from "react"

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  Button,
} from "@mui/material"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useLoaderData, LoaderFunctionArgs } from "react-router-dom"
 
import { selectShip } from 'lib/api/ship'

import {AuthContext} from "components/providers/AuthContextProvider"

import type { SelectShip } from "types/ship"


export const detailLoader = async ({params}: LoaderFunctionArgs): Promise<SelectShip> => {
  const res = await selectShip(params.id);
  const ship = res.data
  return ship
}



export const ShipDetails =memo(() => {
  const ship = useLoaderData() as SelectShip


  console.log("ship detailのレンダリング")

  const { currentUser } =useContext(AuthContext)
  
  return(
    <>
      <Box>
        <Typography sx={{mb:1}}>整備情報</Typography>
        <span>機番 : {ship.regiNumber}</span>
      </Box>
      <Box>
        <Button >新規作成</Button>
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
                {ship.maintenances.map((maintenance) =>{
                  return(
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={maintenance.id} >
                      <TableCell sx={{minWidth:100}}>
                        {currentUser?.section === "整備部"? <EditIcon sx={{mr:1}}></EditIcon>:<VisibilityIcon></VisibilityIcon>}
                        {currentUser?.id === maintenance.userId? <DeleteIcon ></DeleteIcon>: ""}
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