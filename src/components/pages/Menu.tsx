import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";

import { MenuData } from 'interfaces/index'
import { menu } from 'lib/api/menu';
import {ListItem} from 'components/pages/List'

export const Menu: React.FC = () => {
  const [menus, setMenus] = useState<MenuData[]>([]);

  useEffect(() => {
    menu().then((res) => {
      console.log(res.data)
      setMenus(res.data);
    })
  }, []);

  return(
    <>
      {menus.map(menu => (
        <ListItem key={menu.id} id={menu.id} name={menu.name} />
      ))}
    </>
  )
}
