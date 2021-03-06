import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import  Cookies from 'js-cookie'

import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { AuthContext } from "components/providers/AuthContextProvider"
import AlertMessage from 'components/utils/AlertMessage'
import { signUp } from 'lib/api/auth'
import { SignUpData } from 'interfaces/index'


export const SignUp: React.FC =() => {
  const navigate = useNavigate()
  
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignUpData = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    console.log(data)

    try {
      const res = await signUp(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")

        console.log("sign in success!!")
      }
      else {
        setAlertMessageOpen(true)
      }
    }
    catch(err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card sx={{p:2, maxWidth: 400}} >
          <CardHeader sx={{textAlign: "center" }} title="??????????????????" />
          <CardContent>
            <TextField variant="outlined" required fullWidth label="??????" value={name} margin="dense" onChange={event => setName(event.target.value)} />
            <TextField variant="outlined" required fullWidth label="?????????????????????" value={email} margin="dense" onChange={event => setEmail(event.target.value)} />
            <TextField variant="outlined" required fullWidth label="???????????????" type="password" value={password} margin="dense" autoComplete="current-password" onChange={event => setPassword(event.target.value)} />
            <TextField variant="outlined" required fullWidth label="???????????????(?????????)" type="password" value={passwordConfirmation} margin="dense" autoComplete="current-password" onChange={event => setPasswordConfirmation(event.target.value)} />
            <Typography sx={{pt:2, textAlign:"right", flexGrow:1, textTransform:"none"}}>
              <Button type="submit" variant="outlined" color="primary" disabled={!name || !email || !password || !passwordConfirmation ? true : false} onClick={handleSubmit}>
                ??????
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </form>
      <AlertMessage open={alertMessageOpen} setOpen={setAlertMessageOpen} severity="error" message="???????????????????????????????????????????????????????????????" /> 
    </>
  );
}

