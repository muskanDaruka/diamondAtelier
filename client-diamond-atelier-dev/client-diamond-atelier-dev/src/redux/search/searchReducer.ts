import instance from "@/Config/axios.config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface Search {
    data: Record<string, any>;
    error: boolean;
    isLoading: boolean;
}



const initialState: Search = {
    data: {},
    error: false,
    isLoading: false,
};



export const searchApi = createAsyncThunk(
    "Search",
    async (data: {PACKET_NO:string }, { rejectWithValue }) => {
        try {
            const response = await instance.get(`/GlobalSearch/GetCertifiedInventoryData?PACKET_NO=${data.PACKET_NO}`);
            // if(response?.data?.Table?.length && response?.data?.Table[0]?.COMMENT_TYPE === "CERTIFIED"){
            //     window.location.href = `certifiedResult?PACKET_NO=${data.PACKET_NO}`
            // }
            return response.data
        } catch (error: any) {
            toast.error(error?.message)
        }
    }
);

const searchSlice = createSlice({
    name: "Search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(searchApi.fulfilled, (state, action: PayloadAction<Search>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = false;
            })
            .addCase(searchApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            });
    }
});

const searchReducer = searchSlice.reducer;
export default searchReducer;
