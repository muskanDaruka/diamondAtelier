
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import { ValidationSchemaType } from "@/schemas/certified-stone/formData.types";

// interface filterType {
//     deaL_INT_STAGE?: string[] | string,
//     shapE_SEQ?:string[] | string,
//     laB_SEQ?:string[] | string,
//     coloR_SEQ?: string[] | string,
//     puritY_SEQ?: string[] | string,
//     polisH_SEQ?:string[] | string,
//     cuT_SEQ?: string[] | string,
//     symM_SEQ?: string[] | string,
//     reporT_NO?: string,
//     PACKET_NO?: string,
//     PREFIX?: string[] | string,
//     froM_WGT?: number | string,
//     tO_WGT?: number | string,
//     ratiO_FROM?: number | string,
//     ratiO_TO?: number | string,
//     tableP_FROM?: number | string,
//     tableP_TO?: number | string,
//     depthP_FROM?: number | string,
//     depthP_TO?: number | string,
//     lengtH_FROM?: number | string,
//     lengtH_TO?: number | string,
//     widtH_FROM?: number | string,
//     widtH_TO?: number | string,
//     deptH_FROM?: number | string,
//     deptH_TO?: number | string,
//     PRATE_FROM?: number | string,
//     PRATE_TO?: number | string,
//     PVALUE_FROM?: number | string,
//     PVALUE_To?: number | string,
//     PAGENO: number | string,
//     priceType?: number | string,
//     country?: string[] | string,
//     FDISC_PER:number | string,
//     TDISC_PER:number | string
//     coloR_DESC?:string,
//     icolor_desc?:string,
//     partyrole?:string,
//     PARTYRATE:number|string
// }

type Data = {
    data?: any;
}

interface initState {
    data:any,
    error:boolean,
    isLoading:boolean,
    filters:ValidationSchemaType | object
}

// froM_WGT: searchParams.get("froM_WGT") || 0,
// tO_WGT: searchParams.get("tO_WGT") || 0,
// ratiO_FROM: searchParams.get("ratiO_FROM") || 0,
// ratiO_TO: searchParams.get("ratiO_TO") || 0,
// tableP_FROM: searchParams.get("tableP_FROM") || 0,
// tableP_TO: searchParams.get("tableP_TO") || 0,
// depthP_FROM: searchParams.get("depthP_FROM") || 0,
// depthP_TO: searchParams.get("depthP_TO") || 0,
// lengtH_FROM: searchParams.get("lengtH_FROM") || 0,
// lengtH_TO: searchParams.get("lengtH_TO") || 0,
// widtH_FROM: searchParams.get("widtH_FROM") || 0,
// widtH_TO: searchParams.get("widtH_TO") || 0,
// deptH_FROM: searchParams.get("deptH_FROM") || 0,
// deptH_TO: searchParams.get("deptH_TO") || 0,
// PRATE_FROM: searchParams.get("PRATE_FROM") ?? 0,
// PRATE_TO: searchParams.get("PRATE_TO") ?? 0,
// PVALUE_FROM: searchParams.get("PVALUE_FROM") ?? 0,
// PVALUE_To: searchParams.get("PVALUE_To") ?? 0,

const initialState:initState = {
    data:{},
    error: false,
    isLoading: false,
    filters:{}
};

export const certifiedStoneApi = createAsyncThunk(
   "certifiedStone",
   async(filters:ValidationSchemaType,{rejectWithValue}  )=>{
     filters.froM_WGT = filters.froM_WGT == "" ? 0 : filters.froM_WGT
     filters.tO_WGT = filters.tO_WGT == "" ? 0 : filters.tO_WGT
     filters.ratiO_FROM = filters.ratiO_FROM == "" ? 0 : filters.ratiO_FROM
     filters.ratiO_TO = filters.ratiO_TO == "" ? 0 : filters.ratiO_TO
     filters.tableP_FROM = filters.tableP_FROM == "" ? 0 : filters.tableP_FROM
     filters.tableP_TO = filters.tableP_TO == "" ? 0 : filters.tableP_TO
     filters.depthP_FROM = filters.depthP_FROM == "" ? 0 : filters.depthP_FROM
     filters.depthP_TO = filters.depthP_TO == "" ? 0 : filters.depthP_TO
     filters.lengtH_FROM = filters.lengtH_FROM == "" ? 0 : filters.lengtH_FROM
     filters.lengtH_TO = filters.lengtH_TO == "" ? 0 : filters.lengtH_TO
     filters.widtH_FROM = filters.widtH_FROM == "" ? 0 : filters.widtH_FROM
     filters.widtH_TO = filters.widtH_TO == "" ? 0 : filters.widtH_TO
     filters.deptH_FROM = filters.deptH_FROM == "" ? 0 : filters.deptH_FROM
     filters.deptH_TO = filters.deptH_TO == "" ? 0 : filters.deptH_TO
     filters.PRATE_FROM = filters.PRATE_FROM == "" ? 0 : filters.PRATE_FROM
     filters.PRATE_TO = filters.PRATE_TO == "" ? 0 : filters.PRATE_TO
     filters.PVALUE_FROM = filters.PVALUE_FROM == "" ? 0 : filters.PVALUE_FROM
     filters.PVALUE_To = filters.PVALUE_To == "" ? 0 : filters.PVALUE_To
     filters.FDISC_PER = filters.FDISC_PER == "" ? 0 : filters.FDISC_PER
     filters.TDISC_PER = filters.TDISC_PER == "" ? 0 : filters.TDISC_PER
     filters.PARTYRATE =JSON.parse(localStorage.getItem("PARTYRATE")||"0") ||0
     filters.PARTY_CODE =JSON.parse(localStorage.getItem("wPartyCode")||"0")
     try {  
        const response = await instance.post("/CertifiedInventory/GetCertifiedInventoryData",filters);
        return await {data: response.data, filters};
     } catch (error:any) {
        return rejectWithValue(error.response?.data);
     }
   }
);

const certifiedStoneSlice = createSlice({
    name:"certifiedStone",
    initialState,
    reducers: {
    setFilters(state, action) {
        state.filters = action.payload;
    },
    resetState: () => initialState
    },
    extraReducers: (builder) =>{
        builder
             .addCase(certifiedStoneApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
             })
             .addCase(certifiedStoneApi.fulfilled, (state, action) => {
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
            .addCase(certifiedStoneApi.rejected,(state)=>{
                state.isLoading = false;
                state.error  = true; 
            })
    }
})

export const { resetState } = certifiedStoneSlice.actions;
export const { setFilters } = certifiedStoneSlice.actions;
const getAllStoneReducer = certifiedStoneSlice.reducer;
export default getAllStoneReducer;