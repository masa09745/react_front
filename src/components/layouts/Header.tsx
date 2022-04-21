import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"

import { Menu } from "@mui/icons-material"

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"


const Header: React.FC =() => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
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
          <Button color="inherit" onClick={handleSignOut}>サインアウト</Button>
        )
      }
      else {
        return (
          <Button color="inherit">サインイン</Button>
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
          <IconButton sx={{mr:2}} edge="start" color="inherit">
            <Menu />
          </IconButton>
          <Typography component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }} variant="h6">
            Sample
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header