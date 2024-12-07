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
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "12px"
};

const schema = z.object({
    packet_List: z.string(),
    party_Seq: z.string(),
    holD_COMMENT: z.string(),
    hold_Duration: z.string(),
    offer: z.number().min(0, { message: "Offer must be greater than 0" })
});

type HoldProps = z.infer<typeof schema>;

const item = { icon: <FaPause className="mx-auto" />, title: "Bid" };

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
    rows: Row<Fields>[]
}

export default function BidStone({ rows }: RowData) {
    const [offerOpen, setOfferOpen] = useState(false);

    const handleOpen = () => {
        if (rows.length === 0) {
            toast.error("Select at least one row");
            return;
        }
        if (rows.length > 1) {
            toast.error("You can only hold one stone at a time");
            return;
        }
        setOfferOpen(true); 
    };

    const handleOfferClose = () => setOfferOpen(false);

    const { handleSubmit, register, formState: { errors }, } = useForm<HoldProps>({
        defaultValues: {
            packet_List: "",
            party_Seq: "",
            holD_COMMENT: "",
            hold_Duration: "60",
            offer: 0
        },
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: HoldProps) => {
        const NET_RATE = rows[0]?.original?.NET_RATE;
        if (data.offer <= NET_RATE) {
            toast.error(`Offer must be greater than $${NET_RATE}`);
            return;
        }
        setOfferOpen(false); 
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
                open={offerOpen}
                onClose={handleOfferClose}
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-2 text-center">
                        <h2 className="text-lg font-bold">Make an Offer</h2>
                        <p className="text-lg font-normal mb-2">This stone is already on hold. Please make an offer, if you wish to purchase it.</p>
                        <input
                            type="number"
                            placeholder="Offer should be more than price per carat."
                            className="border rounded p-2 mb-2 w-full"
                            min={rows[0]?.original.NET_RATE}
                            {...register("offer")}
                        />
                        {errors.offer && <p className="text-red-500">{errors.offer.message}</p>}
                        <div className='flex justify-center items-center gap-5'>
                            <button type='submit' className='ring ring-blue-700 text-center mt-3 rounded-xl px-6 cursor-pointer'>Offer</button>
                            <button type="button" onClick={handleOfferClose} className="ring ring-blue-700 mt-3 rounded-xl px-6">Close</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
