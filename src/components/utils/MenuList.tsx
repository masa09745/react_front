import React from 'react';

import { ListItemIcon, ListItemButton, ListItemText}  from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export const MenuList = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        < AirplanemodeActiveIcon />
      </ListItemIcon>
      <ListItemText primary="機材情報" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        < CalendarMonthIcon />
      </ListItemIcon>
      <ListItemText primary="スケジュール情報" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        < PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="社員管理" />
    </ListItemButton>
  </React.Fragment>
)