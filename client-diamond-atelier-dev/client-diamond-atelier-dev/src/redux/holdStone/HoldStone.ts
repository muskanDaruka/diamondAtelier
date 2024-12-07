
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import toast from "react-hot-toast";

interface initState {
    status: boolean,
    error: boolean,
    isLoading: boolean
}

interface propType {
    packet_List:string;
    party_Seq:string;
    holD_COMMENT:string;
}

const initialState: initState = {
    status: false,
    error: false,
    isLoading: false
};

export const holdStoneApi = createAsyncThunk(
    "holdStone",
    async (data: propType, { rejectWithValue }) => {
        try {
            const response = await instance.post("/HoldUnhold/SaveHoldData", data);
            toast.success("Stone holded Successfully!!");
            return await response.data;
        } catch (error: any) {
            toast.error(error.message)
            return rejectWithValue(error.response?.data);
        }
    }
);

const holdStoneSlice = createSlice({
    name: "holdStone",
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(holdStoneApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(holdStoneApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status == "Success" ? true : false;
                state.error = false;

            })
            .addCase(holdStoneApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

const holdStoneReducer = holdStoneSlice.reducer;
export default holdStoneReducer;


