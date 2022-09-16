import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel  from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import { useForm, SubmitHandler, Controller } from "react-hook-form"

import type { DefaultValues } from "react-hook-form"
import {ShipContext} from "components/providers/ShipContextProvider"
import { AuthContext } from "components/providers/AuthContextProvider"

type Inputs = {
  title: string
  ATA: string
  MaintenanceMessage: string
  Checkbox: boolean
  Select: number
  description: string
}

const defaultValues: DefaultValues<Inputs> = {
  title: "",
  ATA: "",
  MaintenanceMessage: "",
  Checkbox: false,
  description: "",
  Select: 0,
}

export const BasicModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {selectShipId, selectShip} = useContext(ShipContext)
  const { currentUser } = useContext(AuthContext)

  console.log(currentUser?.employeeNumber)

  const { control, handleSubmit, formState:{errors} } = useForm<Inputs>({defaultValues});

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
      min: {
        value: 1,
        message: "優先度を選んで下さい"
      }

    }
  }

  const onSubmit:SubmitHandler<Inputs> =(data)=> {
   console.log(data)
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  return (
    <div>
      <Button onClick={handleOpen}>追加</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            選択中の機番: {selectShip}
          </Typography>
          <Box component="form" id="modal-modal-description"  onSubmit={handleSubmit(onSubmit)}>
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
                  name="ATA"
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
                  name="MaintenanceMessage"
                  control={control}
                  render={({ field }) => <TextField fullWidth {...field} />}
                />
              </Grid>
              <Grid item xs={4}>
                <label>優先度</label>
                <Controller
                  name="Select"
                  control={control}
                  rules={validationRoles.priority}
                  render={({ field, fieldState }) => (
                  <TextField select fullWidth {...field} type="number" helperText={fieldState.error?.message} >
                      <MenuItem value={0}></MenuItem>
                      <MenuItem value={1}>高</MenuItem>
                      <MenuItem value={2}>中</MenuItem>
                      <MenuItem value={3}>低</MenuItem>
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
              <Grid item xs={6}>
                <Controller
                  name="Checkbox"
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
            <Button type="submit">送信</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}