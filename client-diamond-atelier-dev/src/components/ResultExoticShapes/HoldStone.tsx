import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaPause } from 'react-icons/fa';
import ResultBtn from '../common/ResultBtn';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/ReduxHook';
import { holdStoneApi } from '@/redux/holdStone/HoldStone';
import toast from 'react-hot-toast';
import { Row } from '@tanstack/react-table';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "12px"
};

const schema = z.object({
  packet_List: z.string({
    required_error: "Packet No. is required",
    invalid_type_error: "Packet No. must be a string",
  }),
  party_Seq:z.string(),
  holD_COMMENT: z.string(),
})

type HoldProps = {
  packet_List: string;
  party_Seq: string; 
  holD_COMMENT:string;
}

const item = { icon: <FaPause className="mx-auto" />, title: "Hold" };

type Fields = {
  id:number;
  PACKET_NO: string;
  STOCK: string;
  PREFIX: string;
  SHAPE: string;
  WGT: number;
  TOT_WGT: number;
  LENGTH: number;
  WIDTH: number;
  COLOR: string;
  LAB: string;
  SALERATE: number;
  VALUE: number;
  RATIO: number;
  MM_N: string;
  DEPTH: number;
  CUT: string;
  LOCATION: string;
};

type RowData = {
  rows:Row<Fields>[]
}

export default function HoldStone({rows}:RowData) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () =>{ 
    if (rows[0]?.original?.STOCK === 'H' || rows[0]?.original?.STOCK === 'M') {
      toast.error('This stone is already on hold.')
      return;
    }
    if(rows.length==0){
      toast.error("select at least one row");
      return;
    }
    if(rows.length>1){
      toast.error("you can only hold one stone at a time");
      return;
    }
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const { handleSubmit } = useForm({
    defaultValues: {
      packet_List: "",
      party_Seq: "",
      holD_COMMENT:"",
      hold_Duration: "60"
    },
    resolver: zodResolver(schema)
  });

 
  const onSubmit = (data: HoldProps) => {
    if(rows[0]?.original?.STOCK === 'H' || rows[0]?.original?.STOCK === 'M'){
      toast.error('This stone is already on hold.')
      return;
    }
    data.party_Seq = localStorage.getItem("wPartyCode") || ""
    data.packet_List = rows[0]?.original?.PACKET_NO
    data.holD_COMMENT = "test";
    dispatch(holdStoneApi(data));
    setOpen(false);
  }


  return (
    <div>
      <ResultBtn
        key={item.title}
        icon={item.icon}
        title={item.title}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-2 text-center'>
            <h1 className='text-lg font-bold mb-2'>Are you sure, You want to hold this stone?</h1>
            <select className='block mx-auto border mb-3 font-bold text-xs rounded-xl p-1'>
              <option>Choose hold duration</option>
              <option value="">1 hr</option>
              <option value="">3 hrs</option>
              <option value="">6 hrs</option>
              <option value="">24 hrs</option>
            </select>
            {/* <p className='text-sm font-normal mb-2'>If you wish to hold for 24 hours, Please contact our sales person.</p> */}
            <button type='submit' className='ring ring-blue-700 text-center mt-3 rounded-xl  px-6 cursor-pointer mr-5'>Hold</button>
            <button type='button' onClick={handleClose} className='ring ring-blue-700 text-center mt-3 rounded-xl  px-6 cursor-pointer '>Close</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}


