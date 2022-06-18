import React, { useState, useEffect } from 'react';

import { ShipData } from 'interfaces/index';
import { ship } from 'lib/api/ship';

import { Box, Card, CardActionArea, CardContent, Typography, Tab, } from "@mui/material";
import { TabContext, TabPanel, TabList} from '@mui/lab'

import { ShipList } from 'components/utils/ShipList'
import { ShipDetails } from 'components/pages/ShipDetails'


export const Ship: React.FC = () => {
  const [ships, setShips] = useState<ShipData[]>([])
  const [selectShip, setSelectShip] = useState("")
  const [value, setValue] = useState("1")

  const handleChange = (event: React.SyntheticEvent, newValue:string) =>{
    setValue(newValue)
  };

  useEffect (() => {
    const fetchShip = async () => {
      const res =  await ship();
      setShips(res.data);
    };
    fetchShip();
  }, []);

  return(
    <>
      <Box>
        <Typography sx={{ mb:1 }}>
          機材一覧
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap:" wrap",
            gap: 2,
            mb: 5,
            px: 2,
          }}
        >
          {ships.map((ship) =>
            <Card
            key={ship.id}
            onClick={() => setSelectShip(ship.regiNumber)}
            sx={{
              width:100,
              textDecoration:"none",
              textAlign: "center"
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6" component="div">
                  {ship.regiNumber}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          )}
        </Box>
      </Box>
      <Typography sx={{mb:1}}>
        機材情報
      </Typography>
        <Box>
          <Box sx={{px:2}}>
            選択中の機番 : {selectShip}
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