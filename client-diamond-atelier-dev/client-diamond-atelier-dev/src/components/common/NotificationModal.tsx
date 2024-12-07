import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:"12px"
};

type Modal = {
   open:boolean,
   msg:string,
   handleClose:()=>void
}

export default function NotificationModal({open,msg,handleClose}:Modal) {


  return (
    <div className={"absolute"}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography className='text-center' id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>
          <div className='text-center'>
           <button className="border-2 border-[#2366c3]  py-2 px-8 rounded-xl transition-all mt-3" onClick={handleClose}>OK</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}