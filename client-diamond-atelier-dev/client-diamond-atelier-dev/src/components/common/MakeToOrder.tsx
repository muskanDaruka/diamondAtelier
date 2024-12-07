import FileUpload from '@/utils/FileUpload';
import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    border: "none",
    p: 4,
};
interface MakeToOrderProps {
    open: boolean;
    handleClose: () => void;
}
const MakeToOrder: React.FC<MakeToOrderProps> = ({ open, handleClose }: any) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title font-bold" variant="h6" component="h2">
                    Make To Order
                </Typography>
                <hr />
                <FileUpload/>
                <p className='text-sm font-bold mb-2 font-serif mt-2'>Add your comments here</p>
                <textarea required={true} className="rounded-md px-3 h-40 w-full border border-gray-300" />
                <span className='space-x-2'>
                    <button type="submit" className="rounded-xl text-lg px-4 py-1 bg-blue-600 text-white font-serif">Send</button>
                    <button type="button" onClick={handleClose} className="rounded-xl text-lg px-4 py-1 bg-blue-600 text-white font-serif">Close</button>
                </span>
            </Box>
        </Modal>
    );
};

export default MakeToOrder