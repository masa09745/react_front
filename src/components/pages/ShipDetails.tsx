import React from "react"

import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabPanel, TabList} from '@mui/lab'
import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper} from "@mui/material"


import { useShipDetails } from 'hooks/useShipDetails'

import type { SelectShip } from "types/ship"

import { ScheduleList } from "components/utils/ScheduleList";
import { MaintenanceList } from "components/utils/MaintenanceList";
import { BasicModal } from "components/utils/Modal"

export const ShipDetails:React.FC<SelectShip> = (props) => {

  const { selectShip, value, schedules, maintenances, handleChange, changeView } = useShipDetails(props)

  return(
    <>
      <Typography sx={{mb:1}}>
        機材情報
      </Typography>
      <Box>
          <Box sx={{px:2, mb:1}}>
            機番 : {selectShip}
          </Box>
          <Box sx={{width: '100%', typography:'body1'}}>
            <TabContext value={value}>
              <Box sx={{borderBottom:1, borderColor:'divider'}}>
                <TabList onChange={handleChange} aria-label="tab API Test">
                  <Tab label="スケジュール" value="1" />
                  <Tab label="整備" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>Fright Number</TableCell>
                        <TableCell align='center'>From</TableCell>
                        <TableCell align='center'>To</TableCell>
                        <TableCell align='center'>Dep Date</TableCell>
                        <TableCell align='center'>Dep Time</TableCell>
                        <TableCell align='center'>Arr Date</TableCell>
                        <TableCell align='center'>Arr Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedules.map((schedule) =>(
                        <ScheduleList key={schedule.id} id={schedule.id} flightNumber={schedule.flightNumber} from={schedule.from} to={schedule.to} depDate={changeView(schedule.depDate)} depTime= {changeView(schedule.depTime)} arrDate={changeView(schedule.arrDate)} arrTime={changeView(schedule.arrTime)} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value="2">
                <Box >
                  <BasicModal />
                </Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>Date</TableCell>
                        <TableCell align='center'>ATA</TableCell>
                        <TableCell align='center'>Title</TableCell>
                        <TableCell align='center'>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {maintenances.map((maintenance) =>(
                        <MaintenanceList key={maintenance.id} id={maintenance.id} date={changeView(maintenance.date)} ata={maintenance.ata} title={maintenance.title} description={maintenance.description}/>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
    </>

  )
}