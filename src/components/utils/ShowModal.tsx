
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


import type { MaintenanceData } from "types/maintenance"

type Props = {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  maintenance?: MaintenanceData

}

export const ShowModal = (props:Props) =>{
  const {modalOpen, setModalOpen, maintenance} = props

  const handleClose = () =>{
    setModalOpen(false)
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


  return(
    <>
      <Modal
      open={modalOpen}
      onClose ={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {maintenance?.title}
            </Grid>
            <Grid item xs={12}>
              {maintenance?.description}
            </Grid>
            <Grid item xs={6}>
              {maintenance?.maintenanceMessage}
            </Grid>
            <Grid item xs={6}>
              {maintenance?.priority}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>

  )
}