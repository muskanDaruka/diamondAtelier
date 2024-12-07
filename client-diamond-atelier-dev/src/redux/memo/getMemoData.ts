import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

interface filterType {
    deaL_INT_STAGE?: string[] | string,
    shapE_SEQ?:string[] | string,
    laB_SEQ?:string[] | string,
    coloR_SEQ?: string[] | string,
    puritY_SEQ?: string[] | string,
    polisH_SEQ?:string[] | string,
    cuT_SEQ?: string[] | string,
    symM_SEQ?: string[] | string,
    reporT_NO?: string,
    PACKET_NO?: string,
    PREFIX?: string[] | string,
    froM_WGT?: number | string,
    tO_WGT?: number | string,
    ratiO_FROM?: number | string,
    ratiO_TO?: number | string,
    tableP_FROM?: number | string,
    tableP_TO?: number | string,
    depthP_FROM?: number | string,
    depthP_TO?: number | string,
    lengtH_FROM?: number | string,
    lengtH_TO?: number | string,
    widtH_FROM?: number | string,
    widtH_TO?: number | string,
    deptH_FROM?: number | string,
    deptH_TO?: number | string,
    PRATE_FROM?: number | string,
    PRATE_TO?: number | string,
    PVALUE_FROM?: number | string,
    PVALUE_To?: number | string,
    PAGENO: number | string,
    priceType?: number | string,
    country?: string[] | string,
    coloR_DESC?:string,
    icolor_desc?:string,
    partyrole?:string
}

type Data = {
    data?: any
}

interface initState {
    data:Data,
    error:boolean,
    isLoading:boolean,
    filters:filterType | object
}


const initialState:initState = {
    data:{},
    error: false,
    isLoading: false,
    filters:{}
};

export const getAllMemoApi = createAsyncThunk(
   "getAllMemo",
   async(filters:{action:boolean,page_no:number},{rejectWithValue}  )=>{
     try {  
        const response = await instance.get(`/Memo/GetMemoData?is_own_memo_list=${filters.action}&page_no=${filters.page_no}`);
        return await {data: response.data, filters};
     } catch (error:any) {
        return rejectWithValue(error.response?.data);
     }
   }
);

const memoSlice = createSlice({
    name:"getAllMemo",
    initialState,
    reducers: {
    resetState: () => initialState
    },
    extraReducers: (builder) =>{
        builder
             .addCase(getAllMemoApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
             })
             .addCase(getAllMemoApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload
            })
            .addCase(getAllMemoApi.rejected,(state)=>{
                state.isLoading = false;
                state.error  = true; 
            })
    }
})

export const { resetState } = memoSlice.actions;
const getAllMemoReducer = memoSlice.reducer;
export default getAllMemoReducer;