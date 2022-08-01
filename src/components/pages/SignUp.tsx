import React, { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import  Cookies from 'js-cookie'

import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select  from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

import { AuthContext } from "components/providers/AuthContextProvider"
import AlertMessage from 'components/utils/AlertMessage'
import ComboBox from 'components/utils/ComboBox'

import { signUp } from 'lib/api/auth'

import type { SignUpData } from 'types/user'
import type { ComboBoxItem } from 'types/ComboBoxItem'
import type { SectionRole } from 'types/SectionRole'

const SectionRoleList: SectionRole[] = [
  {
    sectionName: "所属を選んで下さい",
    roles: [
      {roleName: "役職を選んで下さい"}
    ]
  },
  {
    sectionName: "運航乗員部",
    roles: [
      {roleName: "機長"},
      {roleName: "副操縦士"},
    ],
  },
  {
    sectionName: "客室乗員部",
    roles: [
      {roleName: "チーフ"},
      {roleName: "キャビンアテンダント"},
    ]
  },
  {
    sectionName: "整備部",
    roles: [
      {roleName: "整備士"},
    ]
  }
]


export const SignUp: React.FC =() => {
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [firstKana, setFirstKana] = useState<string>("")
  const [lastKana, setLastKana] = useState<string>("")
  const [employeeNumber, setEmployeeNumber] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [section, setSection] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const [sectionOptions] =useState<ComboBoxItem[]>(
    SectionRoleList.map((i) => {
      return {
        value: i.sectionName,
      };
    })
  );
  
  const [selectedSectionName, setSelectedSectionName] = useState<string>(
    SectionRoleList[0].sectionName
  );

  const roleOptionRef = useRef(
    SectionRoleList.filter(
      (i) =>i.sectionName === selectedSectionName
    )[0].roles.map((i) => {
      return{
        value: i.roleName
      };
    })
  );

  const [selectedRoleName, setSelectedRoleName] = useState<string>(
    SectionRoleList[0].roles[0].roleName
  )

  const onSectionComboBoxChangeHandler = (sectionName: string) => {
    setSelectedSectionName(sectionName);

    const selectedSectionRoles = SectionRoleList.filter(
      (i) => i.sectionName === sectionName
    )[0].roles;

    setSelectedRoleName(selectedSectionRoles[0].roleName);
    roleOptionRef.current = selectedSectionRoles.map((i) => {
      return {
        value: i.roleName
      };
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: SignUpData = {
      firstName: firstName,
      lastName: lastName,
      firstKana: firstKana,
      lastKana: lastKana,
      employeeNumber: employeeNumber,
      email: email,
      section: section,
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
      <Card
        sx={{
          maxWidth: 400,
          mt:2,
          mx: "auto",
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="family-name"
                name="lastName"
                required
                fullWidth
                id="lastName"
                label="性"
                autoFocus
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="名"
                autoFocus
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                name="lastKana"
                required
                fullWidth
                id="lastKana"
                label="性(カナ)"
                autoFocus
                value={lastKana}
                onChange={event => setLastKana(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                name="firstKana"
                required
                fullWidth
                id="firstKana"
                label="名(カナ)"
                autoFocus
                value={firstKana}
                onChange={event => setFirstKana(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="off"
                name="employeeNumber"
                required
                fullWidth
                id="employeeNumber"
                label="社員番号"
                autoFocus
                value={employeeNumber}
                onChange={event => setEmployeeNumber(event.target.value)}
              />
            </Grid>
            <Grid item xs={7}>
              <ComboBox
                inputLabel= "所属"
                items = {sectionOptions}
                value = {selectedSectionName}
                defaultValue={sectionOptions[0].value}
                onChange={(selected) => onSectionComboBoxChangeHandler(selected)}
              />
            </Grid>
            <Grid item xs={7}>
              <ComboBox
                inputLabel= "役職"
                items={roleOptionRef.current}
                defaultValue={""}
                value={selectedRoleName}
                onChange={(selected) => setSelectedRoleName(selected)}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                autoFocus
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                autoComplete="current-password"
                name="password"
                required
                fullWidth
                id="password"
                label="パスワード"
                type="password"
                autoFocus
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                autoComplete="current-password"
                name="passwordConfirmation"
                required
                fullWidth
                id="passwordConfirmation"
                label="パスワード(確認用)"
                type="password"
                autoFocus
                value={passwordConfirmation}
                onChange={event => setPasswordConfirmation(event.target.value)}
              />
            </Grid>
          </Grid>
          <Typography sx={{pt:2, textAlign:"right", flexGrow:1, textTransform:"none"}}>
            <Button type="submit" variant="outlined" color="primary" disabled={!firstName || !lastName || !firstKana || !lastKana || !email || !password || !passwordConfirmation ? true : false} onClick={handleSubmit} >
              送信
            </Button>
          </Typography>
        </Box>
      </Card>
      <AlertMessage open={alertMessageOpen} setOpen={setAlertMessageOpen} severity="error" message="メールアドレスかパスワードが間違っています" /> 
    </>
  );
}

