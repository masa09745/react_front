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

export const BasicModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {selectShipId, selectShip} = useContext(ShipContext)
  const { currentUser } = useContext(AuthContext)

  console.log(currentUser?.employeeNumber)

  const { control } = useForm<Inputs>({
    defaultValues: {
      title: "",
      ATA: "",
      MaintenanceMessage: "",
      Checkbox: true,
      description: "",
      Select: 10,
    }
  });

  const validationRoles = {
    title: {
      required: "タイトルを入力してください",
      minLength: {value: 4, message:'4文字以上です'}
    },
    description: {required: "内容を入力してください"}
  }

  const onSubmit:SubmitHandler<Inputs> =(data: Inputs)=> {
    console.log(`submit: ${data.title}`)
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
          <Box component="form" id="modal-modal-description">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label>タイトル</label>
                <Controller
                  render={({ field }) => <TextField fullWidth {...field} />}
                  name="title"
                  control={control}
                />
              </Grid>
              <Grid item xs={3}>
                <label>ATA</label>
                <Controller
                  render={({ field }) => <TextField fullWidth {...field} />}
                  name="ATA"
                  control={control}
                />
              </Grid>
              <Grid item xs={5}>
                <label>MaintenanceMessage</label>
                <Controller
                  render={({ field }) => <TextField fullWidth {...field} />}
                  name="MaintenanceMessage"
                  control={control}
                />
              </Grid>
              <Grid item xs={4}>
                <label>優先度</label>
                <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select {...field}>
                      <MenuItem value={10}>高</MenuItem>
                      <MenuItem value={20}>中</MenuItem>
                      <MenuItem value={30}>低</MenuItem>
                    </Select>
                  </FormControl>

                )}
                name="Select"
                control={control}
              />
              </Grid>
              <Grid item xs={12}>
                <label>内容</label>
                <Controller
                render={({ field }) => <TextField multiline minRows={5} maxRows={10} fullWidth {...field} />}
                name="description"
                control={control}
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