import React, { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import { AuthContext } from "components/providers/AuthContextProvider"
import AlertMessage from "components/utils/AlertMessage"
import { signIn } from "lib/api/auth"
import type { SignInData } from "types/user"


 export const SignIn: React.FC = () => {
  const navigate = useNavigate()
  console.log(process.env.REACT_APP_API_ENDPOINT)


  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [employeeNumber, setEmployeeNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignInData = {
      employeeNumber: employeeNumber,
      password: password
    }

    try {
      const res = await signIn(data)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)
        setEmployeeNumber("")
        setPassword("")
        navigate("/")
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
      <Card sx={{ maxWidth: 400, mt:10, mx:"auto"}} component="form">
        <CardHeader sx={{ textAlign: 'center' }} title="サインイン" />
        <CardContent>
        <TextField
          autoComplete="employeeNumber"
          variant="outlined"
          required
          fullWidth
          label="社員番号"
          value={employeeNumber}
          margin="dense"
          onChange={event => setEmployeeNumber(event.target.value)}
        />
        <TextField
          autoComplete="current-password"
          variant="outlined"
          required
          fullWidth
          label="パスワード"
          value={password}
          type="password"
          margin="dense"
          onChange={event => setPassword(event.target.value)}
        />
        <Box sx={{ pt:2, textAlign:'right', flexGrow:1, textTransform: 'none' }}>
          <Button type="submit" variant="outlined" color="primary" disabled={!employeeNumber || !password ? true : false} onClick={handleSubmit}>
            送信
          </Button>
        </Box>
        <Box sx={{ textAlign:"center", pt:'2rem' }}>
          <Typography sx={{ variant: "body2" }} >
            アカウントがない方は<Link to="/signup">こちら</Link>
          </Typography>
        </Box>
        </CardContent>
      </Card>

    <AlertMessage open={alertMessageOpen} setOpen={setAlertMessageOpen} severity="error" message="メールアドレスかパスワードが間違っています" />
  </>
  );
}
