import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import { useForm, SubmitHandler, Controller } from "react-hook-form"

import {ShipContext} from "components/providers/ShipContextProvider"

type Inputs = {
  title: string
  description: string
}

export const BasicModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {selectShipId, selectShip} = useContext(ShipContext)

  const { control } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: ""
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
    width: 650,
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
            {selectShip}
          </Typography>
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => <TextField fullWidth  label="タイトル" {...field} />}
                  name="title"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                render={({ field }) => <TextareaAutosize minRows={5}  {...field} />}
                name="description"
                control={control}
              />
              </Grid>
            </Grid>
            <Button type="submit">送信</Button>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}