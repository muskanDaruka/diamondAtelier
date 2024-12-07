import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../../Config/axios.config"


interface CountryState{
    data: any;
    error: boolean;
    isLoading: boolean;
}

const initialState: CountryState = {
    data:{},
    error:false,
    isLoading:false
}


export const getAllCountryApi = createAsyncThunk(
    "getAllCountry",
    async(_,{rejectWithValue}) =>{
        try {
            const response = await instance.get(`/General/GetMasterData?TypeKey=COUNTRY`)
            return await response.data;
        } catch (error:any) {
            rejectWithValue(error.response?.data);
        }
    }
);


const getAllCountrySlice = createSlice({
    name:"getAllCountry",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
              .addCase(getAllCountryApi.pending,(state) => {
                state.isLoading = true;
                state.error = false;
              })
              .addCase(getAllCountryApi.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.data = action.payload;
                state.error = false;
              })
              .addCase(getAllCountryApi.rejected,(state)=>{
                state.isLoading = false;
                state.error = true;
              })
    }
})


const getAllCountryReducer = getAllCountrySlice.reducer;
export default getAllCountryReducer;