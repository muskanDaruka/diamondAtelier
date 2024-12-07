import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import { ValidationSchemaType } from "@/schemas/exotic-shapes/formData.types";
// interface filterType {
//     commenT_TYPE?: string,
//     pageno?: number,
//     stock?: string[],
//     shape?: string,
//     // laB_SEQ?:string,
//     colgrp?: string[],
//     froM_WGT?: number | string,
//     tO_WGT?: number | string,
//     // puritY_SEQ?: string[],
//     // reporT_NO?: string,
//     packeT_NO?: string,
//     grown?: string,
//     f_WEIGHT:number | string;
//     t_WEIGHT:number |string;
//     f_RATIO?: number | string,
//     t_RATIO?: number | string,
//     f_LENGTH?: number | string,
//     t_LENGTH?: number | string,
//     f_WIDTH?: number | string,
//     t_WIDTH?: number | string,
//     f_DEPTH?: number | string,
//     t_DEPTH?: number | string,
//     f_RATE?: number | string,
//     t_RATE?: number | string,
//     f_VALUE?: number | string,
//     t_VALUE?: number | string,
//     priceType?: number | string,
//     country?: string[],
// }

type Data = {
    data?: any
}
interface initState {
    data:Data,
    error:boolean,
    isLoading:boolean,
    filters:ValidationSchemaType| object
}

const initialState:initState = {
    data:{},
    error: false,
    isLoading: false,
    filters:{}
};

export const exoticShapesApi = createAsyncThunk(
   "exoticShapes",
   async(filters:ValidationSchemaType,{rejectWithValue}  )=>{
     filters.f_RATIO = filters.f_RATIO == "" ? 0 : filters.f_RATIO
     filters.t_RATIO = filters.t_RATIO == "" ? 0 : filters.t_RATIO
     filters.f_LENGTH = filters.f_LENGTH == "" ? "" : filters.f_LENGTH
     filters.t_LENGTH = filters.t_LENGTH == "" ? "" : filters.t_LENGTH
     filters.f_WIDTH = filters.f_WIDTH == "" ? "" : filters.f_WIDTH
     filters.t_WIDTH = filters.t_WIDTH == "" ? "" : filters.t_WIDTH
     filters.f_WGT = filters.f_WGT == "" ? 0 : filters.f_WGT
     filters.t_WGT = filters.t_WGT == "" ? 0 : filters.t_WGT
     filters.f_DEPTH = filters.f_DEPTH == "" ? 0 : filters.f_DEPTH
     filters.t_DEPTH = filters.t_DEPTH == "" ? 0 : filters.t_DEPTH
     filters.f_RATE = filters.f_RATE == "" ? 0 : filters.f_RATE
     filters.t_RATE = filters.t_RATE == "" ? 0 : filters.t_RATE
     filters.f_VALUE = filters.f_VALUE == "" ? 0 : filters.f_VALUE
     filters.t_VALUE = filters.t_VALUE == "" ? 0 : filters.t_VALUE
     try {  
        const response = await instance.post("/NonCertifiedInventory/GetNonCertifiedInventoryData",filters);
        return await {data: response.data, filters};
     } catch (error:any) {
        return rejectWithValue(error.response?.data);
     }
   }
);

const exoticShapesSlice = createSlice({
    name:"exoticShapes",
    initialState,
    reducers: {
    setFilters(state, action) {
        state.filters = action.payload;
    },
    resetState: () => initialState,
    },
    extraReducers: (builder) =>{
        builder
             .addCase(exoticShapesApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
             })
             .addCase(exoticShapesApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                const newData = action.payload.data.Table;
                const currentData = current(state).data?.data?.Table || [];
                const mergedData = [...currentData, ...newData];
                state.data = {
                    ...action.payload,
                    data: {
                        ...action.payload.data,
                        Table: mergedData
                    }
                };
            })
            .addCase(exoticShapesApi.rejected,(state)=>{
                state.isLoading = false;
                state.error  = true; 
            })
    }
})

export const { resetState } = exoticShapesSlice.actions;
export const { setFilters } = exoticShapesSlice.actions;
const exoticShapesReducer = exoticShapesSlice.reducer;
export default exoticShapesReducer;