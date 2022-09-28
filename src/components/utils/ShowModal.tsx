
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

type Props = {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>

}

export const ShowModal = (props:Props) =>{
  const {modalOpen, setModalOpen} = props

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
          <p>ShowModal</p>
        </Box>
      </Modal>
    </>

  )
}