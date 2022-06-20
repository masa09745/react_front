import React, { useState } from "react"

import { Box, Tab, Typography } from "@mui/material";
import { TabContext, TabPanel, TabList} from '@mui/lab'

type selectShip = {
  selectShip: string | undefined
}

export const ShipDetails:React.FC<selectShip> = (props) => {

  const { selectShip } = props;
  const [value, setValue] = useState("1")

  const handleChange = (e: React.SyntheticEvent, newValue:string) =>{
    setValue(newValue)
  };

  return(
    <>
      <Typography sx={{mb:1}}>
        機材情報
      </Typography>
      <Box>
          <Box sx={{px:2}}>
            機番 : {selectShip}
          </Box>

          <Box sx={{width: '100%', typography:'body1'}}>
            <TabContext value={value}>
              <Box sx={{borderBottom:1, borderColor:'divider'}}>
                <TabList onChange={handleChange} aria-label="tab API Test">
                  <Tab label="スケジュール" value="1" />
                  <Tab label="整備" value="2" />
                  <Tab label="旅客" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">スケジュール</TabPanel>
              <TabPanel value="2">整備情報</TabPanel>
              <TabPanel value="3">旅客情報</TabPanel>
            </TabContext>
          </Box>
        </Box>
    </>

  )
}