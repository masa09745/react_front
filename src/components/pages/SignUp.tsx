import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Button from "@mui/material/Button"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"

import { SignUpData } from "interfaces/index"
import { signUp } from "lib/api/auth"

const CustomSubmitButton = styled(Button)({
  textAlign: "right",
  flexGrow: 1,
  textTransform: "none"

})
const CustomHeader = styled(CardHeader)({
  textAlign: "center"
})
const CustomCard = styled(Card)({
  maxWidth: 400
})


const SignUp: React.FC = () => {
  const history = useHistory()

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

    try {
      const res = await SignUp(data)
      console.log(res)

      if(res.status === 200) {
        Cookies.set("_access_token", res.headers["access_token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/")

        console.log("Sign in success!!")
      }
      else {
        setAlertMessageOpen(true)
      }
    }
    catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }










  return (
    <>
      <form noValidate autoComplete="off">
        <CustomCard>
          <CustomHeader title="サインアップ" />
          <CardContent>
            <TextField variant="outlined" required fullWidth label="名前" value={name} margin="dense" onChange={event => setName(event.target.value)} />
            <TextField variant="outlined" required fullWidth label="メールアドレス" value={email} margin="dense" onChange={event => setEmail(event.target.value)}/>
            <TextField variant="outlined" required fullWidth label="パスワード" type="password" value={password} margin="dense" autoComplete="current-password" onChange={event => setPassword(event.target.value)}/>
            <TextField variant="outlined" required fullWidth label="パスワード(確認用)" type="password" value={passwordConfirmation} margin="dense" autoComplete="current-password" onChange={event => setPasswordConfirmation(event.target.value)}/>
              <CustomSubmitButton type="submit" variant="outlined" color="primary" disabled={!name || !email || !passwordConfirmation ? true : false} onClick={handleSubmit}>送信</CustomSubmitButton>
          </CardContent>
        </CustomCard>
      </form>
      <AlertMessage open={alertMessageOpen} setOpen={setAlertMessageOpen} severity="error" message="メールアドレスかパスワードが間違っています" />
    </>
  )
}

export default SignUp
