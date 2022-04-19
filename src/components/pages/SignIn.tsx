import React, { useState, useContext } from "react"
import { useHistory, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { styled } from "@mui/material/styles"
import { Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signIn } from "lib/api/auth"
import { SignInData } from "interfaces/index"

const CustomButton = styled(Button)({
  textAlign: "right",
  flexGrow: 1,
  textTransform: "none"
})

const customHeader = styled('div')({
  textAlign: "center"
})

const CustomCard = styled(Card)({
  maxWidth: 400
})

const CustomBox = styled(Box)({
  paddingTop: "2rem"
})

const CustomLink = styled(Link)({
  textDecoration: "none"
})



const SignIn: React.FC = () => {
  const history = useHistory()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const[email, setEmail] = useState<string>("")
  const[password, setPassword] = useState<string>("")
  const[alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignInData = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/")

        console.log("sign in success!!!")
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
      <CustomCard>
        <CardHeader title="サインイン" />
        <CardContent>
        <TextField variant="outlined" required fullWidth label="メールアドレス" value={email} margin="dense" onChange={event => setEmail(event.target.value)} />
        <TextField variant="outlined" required fullWidth label="パスワード" value={password} margin="dense" onChange={event => setPassword(event.target.value)} />
        <CustomBox>
          <CustomButton type="submit" variant="outlined" color="primary" disabled={!email || !password ? true : false} onClick={handleSubmit}>
            送信
          </CustomButton>
        </CustomBox>
        <CustomBox textAlign="center">
          <Typography variant="body2">
            まだアカウントがない方は
            <CustomLink to="/signup">こちら</CustomLink>
            から作成してください
          </Typography>
        </CustomBox>
        </CardContent>
      </CustomCard>
    </form>
    <AlertMessage open={alertMessageOpen} setOpen={setAlertMessageOpen} severity="error" message="メールアドレスかパスワードが間違っています" />
  </>
  )
}

export default SignIn