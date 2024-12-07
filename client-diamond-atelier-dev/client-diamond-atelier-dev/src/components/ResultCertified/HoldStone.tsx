import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaPause } from 'react-icons/fa';
import ResultBtn from '../common/ResultBtn';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
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
  height: 'auto',
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
  party_Seq: z.string(),
  holD_COMMENT: z.string(),
  hold_Duration: z.string({
    required_error: "Duration is required",
    invalid_type_error: "Duration must be a string",
  })
})

type HoldProps = {
  packet_List: string;
  party_Seq: string;
  holD_COMMENT: string;
  hold_Duration: string;
}

const item = { icon: <FaPause className="mx-auto" />, title: "Hold" };

type Fields = {
  PACKET_NO: string;
  STONE_STAGE: string;
  PREFIX: string;
  SHAPE: string;
  WGT: number;
  COLOR: string;
  PURITY: string;
  VIDEO_PATH: string;
  LAB: string;
  RATE: number;
  DISC_PER: number;
  NET_RATE: number;
  NET_VALUE: number;
  RATIO: number;
  MEASUREMENT: string;
  TABLE_PER: number;
  DEPTH_PER: number;
  CUT: string;
  POLISH: string;
  SYMM: string;
  REPORT_NO: string;
  LOCATION: string;
  SUPPLIER_NAME?: string;
  INW_DATE?: string;
  NAME?: string;
  MEMO_DATE?: string;
  MEMO_NO?: string;
  SELLER_NAME?: string;
  COST_DISC_PER?: string;
  COST_RATE?: string;
  COST_VALUE?: string;
  PAGENO: number | string;
};

type RowData = {
  rows: Row<Fields>[];
  customClass?:string;
  openModal?:boolean;
}

export default function HoldStone({ rows,customClass,openModal }: RowData) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (openModal) {
      handleOpen();
    }
  }, [openModal]);
  const handleOpen = () => {
    if (rows[0]?.original?.STONE_STAGE === 'Hold' || rows[0]?.original?.STONE_STAGE === 'Memo') {
      toast.error('This stone is already on hold.')
      return;
    }
    if (rows.length == 0) {
      toast.error("select at least one row");
      return;
    }
    if (rows.length > 1) {
      toast.error("you can only hold one stone at a time");
      return;
    }
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      packet_List: "",
      party_Seq: "",
      holD_COMMENT: "",
      hold_Duration: "60"
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: HoldProps) => {
    if (rows[0]?.original?.STONE_STAGE === 'Hold' || rows[0]?.original?.STONE_STAGE === 'Memo') {
      toast.error('This stone is already on hold.')
      return;
    }
   
    data.party_Seq = localStorage.getItem("wPartyCode") || ""
    data.packet_List = rows[0]?.original?.PACKET_NO
    data.holD_COMMENT = "test";
    data.hold_Duration = data.hold_Duration
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
          customClass={customClass}
        />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-3 text-center'>
            <h1 className='text-lg font-bold mb-2'>Are you sure, You want to hold this stone?</h1>
            <select className='block mx-auto border mb-3 font-bold text-xs rounded-xl p-2 mt-3'>
              <option>Choose hold duration</option>
              <option value="">1 hr</option>
              <option value="">3 hrs</option>
              <option value="">6 hrs</option>
              <option value="">24 hrs</option>
            </select>
            {/* <p className='text-sm font-normal mb-2'>If you wish to hold for 24 hours, Please contact our sales person.</p> */}
            <button type='submit' className='ring ring-blue-700 text-center mt-4 rounded-xl  px-6 cursor-pointer mr-5'>Hold</button>
            <button type='button' onClick={handleClose} className='ring ring-blue-700 text-center mt-3 rounded-xl  px-6 cursor-pointer '>Close</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}


