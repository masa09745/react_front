import { useState, useEffect } from 'react';

import type { ScheduleData } from "types/schedule"
import type { MaintenanceData } from "types/maintenance"
import type { SelectShip } from "types/ship"

import { schedule } from 'lib/api/ship'
import { maintenance } from 'lib/api/ship'

export const useShipDetails = (props:SelectShip) => {
  const { id, selectShip } = props;
  const [value, setValue] = useState("1")
  const [schedules, setSchedule] = useState<ScheduleData[]>([])
  const [maintenances, setMaintenance] = useState<MaintenanceData[]>([])

  const handleChange = (e: React.SyntheticEvent, newValue:string) =>{
    setValue(newValue)
  };

  useEffect (() => {
    const fetchSchedule = async () => {
      const res = await schedule(id);
      setSchedule(res.data)
    };
    fetchSchedule();

    const fetchMaintenance = async () => {
      const res = await maintenance(id);
      setMaintenance(res.data)
    };
    fetchMaintenance();
  }, [id])

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

  return { selectShip, value, schedules, maintenances, handleChange, changeView}
}