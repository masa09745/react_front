import React, { useContext, useEffect, } from'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel  from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';


import { useForm, Controller } from "react-hook-form"

import type { DefaultValues } from "react-hook-form"
import type {InputMaintenance} from "types/maintenance"
import { AuthContext } from "components/providers/AuthContextProvider"


import {useNavigate, useLocation, Link} from "react-router-dom"

import { createMaintenance } from 'lib/api/maintenance'

import type { SelectShip } from "types/ship"


type State = {
  id: number | undefined,
  selectShip: string | undefined
}


export const CreateMaintenance = () => {
  const location = useLocation()
  const { id, selectShip } = location.state as State

  console.log(id)

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const defaultValues: DefaultValues<InputMaintenance> = {
    title: "",
    ata:"",
    description: "",
    maintenanceMessage: "",
    priority: "",
    completed: false,
    userId: currentUser?.id
  }


  const {
    control,
    reset,
    formState,
    formState:{isSubmitSuccessful},
    handleSubmit,
  } = useForm<InputMaintenance>({defaultValues});

  const validationRoles = {
    title: {
      required: "入力必須です"
    },
    description: {
      required: "入力必須です"
    },
    ATA: {
      required: "入力必須です"
    },
    priority: {
      validate: (value: string | '') => value !== '' || '入力必須です'
    }
  }

  const onSubmit = async (inputData: InputMaintenance) => {
    try{
      const res = await createMaintenance(inputData)
        if (res.status === 200) {
          console.log("作成成功")
        }
      }
      catch(err) {
        console.log(err)
      }
    }


  useEffect (() => {
    if(formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState, isSubmitSuccessful, reset])


  return(
    <>
      <Typography variant="h5" component="h5" sx={{mb:1}}>機材情報作成フォーム</Typography>
      <Link to={`/ships/${id}`} state={{id: id, selectShip: selectShip}}>
        <Button variant="contained">機材情報一覧</Button>
      </Link>
      <Box sx={{width: 750, mx: "auto", p:1}}>
          <Typography variant="h5" component="h1">
            選択中の機番: {selectShip}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}  >
            <Grid item xs={5} display="none" >
              <Controller
                name="shipId"
                defaultValue={id}
                control={control}
                render={({ field }) => <TextField fullWidth {...field} />}
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label>タイトル</label>
                <Controller
                  name="title"
                  control={control}
                  rules={validationRoles.title}
                  render={({ field, fieldState }) =>(
                    <TextField
                     {...field}
                     fullWidth
                     type="text"
                     helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <label>ATA</label>
                <Controller
                  name="ata"
                  control={control}
                  rules={validationRoles.ATA}

                  render={({ field, fieldState}) =>(
                    <TextField
                      fullWidth
                      {...field}
                      type="text"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5}>
                <label>MaintenanceMessage</label>
                <Controller
                  name="maintenanceMessage"
                  control={control}

                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Grid>
              <Grid item xs={4}>
                <label>優先度</label>
                <Controller
                  name="priority"
                  control={control}
                  rules={validationRoles.priority}

                  render={({ field, fieldState }) => (
                  <TextField select fullWidth {...field} type="number" helperText={fieldState.error?.message} >
                      <MenuItem value={""}></MenuItem>
                      <MenuItem value={"高"}>高</MenuItem>
                      <MenuItem value={"中"}>中</MenuItem>
                      <MenuItem value={"低"}>低</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <label>内容</label>
                <Controller
                  name="description"
                  control={control}
                  rules={validationRoles.description}

                  render={({ field, fieldState }) =>(
                    <TextField
                      {...field}
                      multiline
                      minRows={5}
                      maxRows={10}
                      fullWidth
                      type="text"
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={10}>
                <Controller
                  name="completed"
                  control={control}

                  render={({ field }) =>
                    <FormControlLabel
                      control={ <Checkbox {...field} />}
                      label="完了"
                    />
                  }
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" >送信</Button>
          </Box>
        </Box>
    </>
  )

}