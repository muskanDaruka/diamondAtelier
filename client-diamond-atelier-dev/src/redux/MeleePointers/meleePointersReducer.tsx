
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import { ValidationSchemaType } from "@/schemas/melee-pointers/formData.types";

// interface filterType {
//     commenT_TYPE?: string,
//     pageno?: number,
//     stock?:string,
//     colgrp?:string,
//     f_LENGTH?: string,
//     t_LENGTH?: string,
//     f_WIDTH?: string,
//     t_WIDTH?: string,
// }

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

export const meleePointersApi = createAsyncThunk(
    "meleePointers",
    async (filters: ValidationSchemaType, { rejectWithValue }) => {
        filters.f_LENGTH = filters.f_LENGTH == "" ? "": filters.f_LENGTH
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

const meleePointersSlice = createSlice({
    name: "meleePointers",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(meleePointersApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(meleePointersApi.fulfilled, (state, action) => {
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
            .addCase(meleePointersApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

export const { resetState } = meleePointersSlice.actions;
export const { setFilters } = meleePointersSlice.actions;
const meleePointersReducer = meleePointersSlice.reducer;
export default meleePointersReducer;