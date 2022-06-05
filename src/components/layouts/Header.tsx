import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"



import { ChevronLeftOutlined, Menu } from "@mui/icons-material"

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"
import { Drawer, List, Divider } from "@mui/material"

import { MenuList } from "components/utils/MenuList"


export const Header: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signin")

        console.log("sign out success!!")
      }
      else {
        console.log("sign out error!")
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    if(!loading) {
      if(isSignedIn) {
        return (
          <Button color="inherit" onClick={handleSignOut}>サインアウト</Button>
        )
      }
      else {
        return (
          <Button component={Link} to="/signin" color="inherit">サインイン</Button>
        )
      }
    }
    else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton sx={{mr:2}} edge="start" color="inherit" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Typography component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }} variant="h6">
            AirLine Management System
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar 
          sx = {{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}>
            <IconButton onClick={toggleDrawer} >
              <ChevronLeftOutlined />
            </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {MenuList}
        </List>
      </Drawer>
    </>
  );
}