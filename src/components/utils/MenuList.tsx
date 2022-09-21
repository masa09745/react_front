import React from 'react';

import { ListItemIcon, ListItemButton, ListItemText, Typography}  from '@mui/material';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { Link } from "react-router-dom"

export const MenuList = (
  <React.Fragment>
    <Typography component={Link} sx={{textDecoration: 'none', color: 'inherit'}} to="/ships">
      <ListItemButton>
        <ListItemIcon>
          < AirplanemodeActiveIcon />
        </ListItemIcon>
        <ListItemText primary="機材情報" />
      </ListItemButton>
    </Typography>
    <ListItemButton>
      <ListItemIcon>
        < PeopleAltIcon />
      </ListItemIcon>
      <ListItemText primary="社員管理" />
    </ListItemButton>
  </React.Fragment>
)