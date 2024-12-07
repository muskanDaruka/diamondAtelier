import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ResultBtn from '../common/ResultBtn';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { GrResume } from 'react-icons/gr';
import { useAppDispatch } from '@/redux/ReduxHook';
import { unHoldStoneApi } from '@/redux/holdStone/UnHoldStone';
import toast from 'react-hot-toast';
import { getAllHoldStoneApi } from '@/redux/holdStone/getAllHoldStone';
import { useSearchParams } from 'next/navigation';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "12px"
};

const schema = z.object({
  VPACKET_NO: z.string({
    required_error: "Packet No. is required",
    invalid_type_error: "Packet No. must be a string",
  })
})

type UnHoldProps = {
  VPACKET_NO: string;
}

const item = { icon: <GrResume className="mx-auto w-20" />, title: "Unhold" };

export default function UnHoldStone({customClass}:{
  customClass?:string
}) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const params = useSearchParams();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      VPACKET_NO: ""
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: UnHoldProps) => {
    dispatch(unHoldStoneApi(data)).then(()=>{
      toast.success("item removed successfully")
      setOpen(false);
    })

   
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
          <Typography id="modal-modal-title" className='text-center' variant="h6" component="h2">
            Unhold Stone
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-2 text-center'>
            <div className='flex flex-col gap-2'>
              <label className='text-start'>Packet No.</label>
              <input {...register("VPACKET_NO")} required placeholder='ex - X-342-13' type="text" className='border border-[gray] rounded-md px-3 py-2' />
            </div>
            <button type='submit' className='ring ring-blue-700 text-center mt-3 rounded-xl py-1 px-3 cursor-pointer'>UnHold</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

