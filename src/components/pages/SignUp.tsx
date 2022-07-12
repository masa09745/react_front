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
import type { SignUpData } from 'types/user'


export const SignUp: React.FC =() => {
  const navigate = useNavigate()
  
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [employeeNumber, setEmployeeNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignUpData = {
      name: name,
      email: email,
      employeeNumber: employeeNumber,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      const res = await signUp(data)

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
        <Card sx={{maxWidth: 400, mt:10, mx:"auto"}} >
          <CardHeader sx={{textAlign: "center" }} title="サインアップ" />
          <CardContent>
            <TextField variant="outlined" required fullWidth label="名前" value={name} margin="dense" onChange={event => setName(event.target.value)} />
            <TextField variant="outlined" required fullWidth label="メールアドレス" value={email} margin="dense" onChange={event => setEmail(event.target.value)} />
            <TextField variant="outlined" required fullWidth label="社員番号" value={employeeNumber} margin="dense" onChange={event => setEmployeeNumber(event.target.value)} />
            <TextField variant="outlined" required fullWidth label="パスワード" type="password" value={password} margin="dense" autoComplete="current-password" onChange={event => setPassword(event.target.value)} />
            <TextField variant="outlined" required fullWidth label="パスワード(確認用)" type="password" value={passwordConfirmation} margin="dense" autoComplete="current-password" onChange={event => setPasswordConfirmation(event.target.value)} />
            <Typography sx={{pt:2, textAlign:"right", flexGrow:1, textTransform:"none"}}>
              <Button type="submit" variant="outlined" color="primary" disabled={!name || !email || !password || !passwordConfirmation ? true : false} onClick={handleSubmit}>
                送信
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </form>
      <AlertMessage open={alertMessageOpen} setOpen={setAlertMessageOpen} severity="error" message="メールアドレスかパスワードが間違っています" /> 
    </>
  );
}

