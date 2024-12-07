import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import instance from "../../Config/axios.config"

interface KycState{
    data: any;
    error: boolean;
    isLoading: boolean;
}

const initialState: KycState = {
    data:{},
    error:false,
    isLoading:false
}


export const getKycMasterApi = createAsyncThunk(
    "getKycMaster",
    async(_,{rejectWithValue}) =>{
        try {
            const response = await instance.get(`/General/GetMasterData?TypeKey=KYC`)
            return await response.data;
        } catch (error: any) {
            rejectWithValue(error.response?.data);
        }
    }
);


const getKycMasterSlice = createSlice({
    name:"getKycMaster",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
              .addCase(getKycMasterApi.pending,(state) => {
                state.isLoading = true;
                state.error = false;
              })
              .addCase(getKycMasterApi.fulfilled, (state,action)=>{
                state.isLoading = false;
                state.data = action.payload;
                state.error = false;
              })
              .addCase(getKycMasterApi.rejected,(state)=>{
                state.isLoading = false;
                state.error = true;
              })
    }
})


const getKycMasterReducer = getKycMasterSlice.reducer;
export default getKycMasterReducer;