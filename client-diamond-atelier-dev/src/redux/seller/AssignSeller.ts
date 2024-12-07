import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import toast from "react-hot-toast";

interface QueryType {
    wparty?:string;
    SHORTNAME?:string;
    SALESMAN?:string;
}

interface InitType {
    data:any,
    error:boolean,
    isLoading:boolean,
}
const initialState: InitType = {
    data: [],
    error: false,
    isLoading: false,
};

export const assignSellerApi = createAsyncThunk(
    "clientList",
    async (data : QueryType, { rejectWithValue }) => {
        try {
            const response = await instance.post("/SolitaireInventory/GET_CLIENTSALESMAN_API",data);
            return response.data;
        } catch (error: any) {
            toast.error(error.message);
            return rejectWithValue(error.response?.data);
        }
    }
);

const assignSellerSlice = createSlice({
    name: "clientList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(assignSellerApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(assignSellerApi.fulfilled, (state, action) => {
                state.isLoading = false; 
                state.data = action.payload;
                state.error = false;
               
            })
            .addCase(assignSellerApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})


const assignSellerReducer = assignSellerSlice.reducer;
export default assignSellerReducer;


