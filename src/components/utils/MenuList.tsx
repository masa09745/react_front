import React from 'react';

import { ListItemIcon, ListItemButton, ListItemText}  from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { Link } from "react-router-dom"

export const MenuList = (
  <React.Fragment>
    <Link to="/ship">
      <ListItemButton>
        <ListItemIcon>
          < AirplanemodeActiveIcon />
        </ListItemIcon>
        <ListItemText primary="機材情報" />
      </ListItemButton>
    </Link>
    <Link to ="/schedule">
      <ListItemButton>
        <ListItemIcon>
          < CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="スケジュール情報" />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        < PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="社員管理" />
    </ListItemButton>
  </React.Fragment>
)