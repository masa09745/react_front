import React, { useContext } from "react"
import { styled } from "@mui/material/styles"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import MUIAppBar, {AppBarProps as MUIAppBarProps} from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"

import { ChevronLeftOutlined, ChevronRightOutlined, Menu } from "@mui/icons-material"

import { signOut } from "lib/api/auth"

import { AuthContext } from "components/providers/AuthContextProvider"
import { Drawer, List, Divider } from "@mui/material"

import { MenuList } from "components/utils/MenuList"

const drawerWidth = 240;

interface AppBarProps extends MUIAppBarProps {
  open? : boolean;
}

const AppBar = styled(MUIAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(( { theme, open }) => ({
  transition: theme.transitions.create(['margin','width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin','width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export const Header: React.FC = () => {

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


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
          <Button color="inherit" onClick={handleSignOut}>??????????????????</Button>
        )
      }
      else {
        return (
          <Button component={Link} to="/signin" color="inherit">???????????????</Button>
        )
      }
    }
    else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static" open={open}>
        <Toolbar>
          <IconButton
            sx={{mr:2, ...(open && {display:'none' }) }}
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
          <Typography component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }} variant="h6">
            AirLine Management System
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
           <ChevronLeftOutlined />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {MenuList}
        </List>
      </Drawer>
    </>
  );
}