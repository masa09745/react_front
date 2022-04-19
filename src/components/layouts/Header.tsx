import React, { useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { styled } from "@mui/material/styles"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/material/Icon"

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"

const CustomTypography = styled(Typography)({
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit",
})

const CustomLinkButton = styled(Button)({
  textTransform: "none"
})

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
          <CustomLinkButton color="inherit" onClick={handleSignOut}>サインアウト</CustomLinkButton>
        )
      }
      else {
        return (
          <CustomLinkButton color="inherit">サインイン</CustomLinkButton>
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
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <CustomTypography variant="h6">
            Sample
          </CustomTypography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header