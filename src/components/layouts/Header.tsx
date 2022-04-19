import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@mui/material"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/material/Icon"

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  linkBtn: {
    textTransform: "none"
  }
}))

const Header: React.FC =() => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const classes = useStyles()
  const history = useHistory()

  const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/signin")

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
          <Button color="inherit" ClassName={classes.linkBtn} onClick={handleSignOut}>サインアウト</Button>
        )
      }
      else {
        return (
          <Button  component={Link} to='/signin' color="inherit" ClassName={classes.linkBtn}>サインイン</Button>
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
          <IconButton edge="start" className={classes.iconButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography component={Link} to="/" variant="h6" className={classes.title}>
            Sample
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header