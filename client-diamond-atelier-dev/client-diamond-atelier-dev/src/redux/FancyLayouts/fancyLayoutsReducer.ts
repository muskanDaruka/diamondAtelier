import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import { ValidationSchemaType } from "@/schemas/fancyLayouts/formData.types";

interface filterType {
    commenT_TYPE?: string,
    pageno?: number,
    f_WGT?: number | string,
    t_WGT?: number | string,
    f_LENGTH?: number | string,
    t_LENGTH?: number | string,
    f_WIDTH?: number | string,
    t_WIDTH?: number | string,
    shape?: string,
    grown?: string,
}

interface initState {
    data: any,
    error: boolean,
    isLoading: boolean,
    filters: ValidationSchemaType | object
}

const initialState: initState = {
    data: {},
    error: false,
    isLoading: false,
    filters: {}
};

export const fancyLayoutsApi = createAsyncThunk(
    "fancyLayouts",
    async (filters: ValidationSchemaType, { rejectWithValue }) => {
        filters.f_WGT = filters.f_WGT == "" ? 0 : filters.f_WGT
        filters.t_WGT = filters.t_WGT == "" ? 0 : filters.t_WGT
        filters.f_LENGTH = filters.f_LENGTH == "" ? "" : filters.f_LENGTH
        filters.t_LENGTH = filters.t_LENGTH == "" ? "" : filters.t_LENGTH
        filters.f_WIDTH = filters.f_WIDTH == "" ? "" : filters.f_WIDTH
        filters.t_WIDTH = filters.t_WIDTH == "" ? "" : filters.t_WIDTH
        try {
            const response = await instance.post("/NonCertifiedInventory/GetNonCertifiedInventoryData", filters);
            return await { data: response.data, filters };
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const fancyLayoutsSlice = createSlice({
    name: "fancyLayouts",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fancyLayoutsApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fancyLayoutsApi.fulfilled, (state, action) => {
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
            .addCase(fancyLayoutsApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

export const { resetState } = fancyLayoutsSlice.actions;
export const { setFilters } = fancyLayoutsSlice.actions;
const fancyLayoutsReducer = fancyLayoutsSlice.reducer;
export default fancyLayoutsReducer;