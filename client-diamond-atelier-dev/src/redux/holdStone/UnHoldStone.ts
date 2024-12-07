import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

interface initState {
    status:boolean,
    error:boolean,
    isLoading:boolean
}

interface propType {
    "VPACKET_NO": string
}

const initialState:initState = {
    status:false,
    error: false,
    isLoading: false
};

export const unHoldStoneApi = createAsyncThunk(
   "unHoldStone",
   async(data:propType,{rejectWithValue}  )=>{
     try {  
        const response = await instance.post("HoldUnhold/SaveUnHoldData",data);
        return await response.data ;
     } catch (error:any) {
        return rejectWithValue(error.response?.data);
     }
   }
);

const unHoldStoneSlice = createSlice({
    name: "unHoldStone",
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(unHoldStoneApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(unHoldStoneApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.status == "Success" ? true : false;
                state.error = false;
            })
            .addCase(unHoldStoneApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

const unHoldStoneReducer = unHoldStoneSlice.reducer;
export default unHoldStoneReducer;


