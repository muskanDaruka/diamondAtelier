import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import toast from "react-hot-toast";

interface SalesManData {
    PARTYNAME?:string;
    SHORTNAME?:string;
    SALESMAN?:string;
    PAGE_NO?:number | string;
}
type propType = {
    SALESMAN:string;
}
interface SalesManState {
    data:any,
    error:boolean,
    isLoading:boolean,
}
const initialState: SalesManState = {
    data: [],
    error: false,
    isLoading: false,
};

export const clientListApi = createAsyncThunk(
    "clientList",
    async (data : SalesManData, { rejectWithValue }) => {
        try {
            const response = await instance.get(`/ClientList/GetClientListData?PAGE_NO=${data.PAGE_NO}`);
            return response.data;
        } catch (error: any) {
            toast.error(error.message);
            return rejectWithValue(error.response?.data);
        }
    }
);

const clientListSlice = createSlice({
    name: "clientList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(clientListApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(clientListApi.fulfilled, (state, action) => {
                state.isLoading = false; 
                state.data = action.payload;
                state.error = false;
               
            })
            .addCase(clientListApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})


const clientListReducer = clientListSlice.reducer;
export default clientListReducer;


