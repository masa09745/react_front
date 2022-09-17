import React, { useContext, useEffect, useState } from "react"

import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabPanel, TabList} from '@mui/lab'
import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper} from "@mui/material"

import type { ScheduleData } from "types/schedule"
import type { MaintenanceData } from "types/maintenance"

import { schedule } from 'lib/api/ship'
import { maintenance } from 'lib/api/ship'

import { ScheduleList } from "components/utils/ScheduleList";
import { MaintenanceList } from "components/utils/MaintenanceList";
import { BasicModal } from "components/utils/Modal"

import { ShipContext } from "components/providers/ShipContextProvider"


export const ShipDetails = () => {

  const { selectShip, selectShipId } = useContext(ShipContext)

  const [schedules, setSchedule] = useState<ScheduleData[]>([])
  const [maintenances, setMaintenance] = useState<MaintenanceData[]>([])
  const [value, setValue] = useState("1")

  const handleChange = (e: React.SyntheticEvent, newValue:string) =>{
    setValue(newValue)
  };

  useEffect (() => {
    const fetchSchedule = async () => {
      const res = await schedule(selectShipId);
      setSchedule(res.data)
    };
    fetchSchedule();

    const fetchMaintenance = async () => {
      const res = await maintenance(selectShipId);
      setMaintenance(res.data)
    };
    fetchMaintenance();
  }, [selectShipId])

  const changeView = (date:string|Date) => {
    date = new Date(date);
    if(date.getFullYear() <= 2000){
      if (date.getMinutes() < 10){
        date = date.getHours()+":0"+date.getMinutes()
      }else{
        date = date.getHours()+":"+date.getMinutes()
      }
    }else{
      date = date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate()
    }
    return date;
  }


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
                      <TableCell align='center'>Title</TableCell>
                      <TableCell align='center'>Description</TableCell>
                      <TableCell align='center'>ATA</TableCell>
                      <TableCell align='center'>Priority</TableCell>
                      <TableCell align='center'>Completed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {maintenances.map((maintenance) =>(
                      <MaintenanceList key={maintenance.id} id={maintenance.id} title={maintenance.title} ata={maintenance.ata} description={maintenance.description} completed={maintenance.completed} priority={maintenance.priority}/>
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