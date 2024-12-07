import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

interface filterType {
    commenT_TYPE?: string,
    pageno?: number,
    length?: number,
    width?: number,
    shape?: string,
    grown?: string
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

export const StockDetailsApi = createAsyncThunk(
    "StockDetail",
    async (filters: filterType, { rejectWithValue }) => {
        try {
            const response = await instance.post("/NonCertifiedInventory/GetNonCertifiedInventoryStockData", filters);
            return await  response.data ;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const StockDetailLayoutSlice = createSlice({
    name: "StockDetail",
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(StockDetailsApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(StockDetailsApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload
            })
            .addCase(StockDetailsApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

export const { resetState } = StockDetailLayoutSlice.actions;
const StockDetailsReducer = StockDetailLayoutSlice.reducer;
export default StockDetailsReducer;