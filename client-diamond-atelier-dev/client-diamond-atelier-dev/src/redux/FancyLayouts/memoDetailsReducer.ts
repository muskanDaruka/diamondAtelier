import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

interface filterType {
    commenT_TYPE: string,
    pageno: number,
    length: number,
    width: number,
    shape: string,
    grown: string
}

interface initState {
    data: any,
    error: boolean,
    isLoading: boolean,
}

const initialState: initState = {
    data: {},
    error: false,
    isLoading: false
};

export const MemoDetailsApi = createAsyncThunk(
    "MemoDetail",
    async (filters: filterType, { rejectWithValue }) => {
        try {
            const response = await instance.post("/NonCertifiedInventory/GetNonCertifiedInventoryMemoOSData", filters);
            return await  response.data ;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const MemoDetailLayoutSlice = createSlice({
    name: "MemoDetail",
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(MemoDetailsApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(MemoDetailsApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload
            })
            .addCase(MemoDetailsApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

export const { resetState } = MemoDetailLayoutSlice.actions;
const MemoDetailsReducer = MemoDetailLayoutSlice.reducer;
export default MemoDetailsReducer;