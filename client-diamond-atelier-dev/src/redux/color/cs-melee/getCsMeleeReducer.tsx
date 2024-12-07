import instance from "@/Config/axios.config";
import { ValidationSchemaType } from "@/schemas/color-stone/cs-meleePointer/formData.types";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";


interface filterType {
    commenT_TYPE?: string,
    stock?: string[],
    fancY_COLOR?: string[],
    purgrp?: string[],
    intensity?: string[],
    packeT_NO?: string,
    f_LENGTH?: number | string,
    t_LENGTH?: number | string,
    f_WIDTH?: number | string,
    t_WIDTH?: number | string,
    pageno?: number,
    grown?:string,
    country?: string[],
}

interface initState {
    data: any,
    error: boolean,
    isLoading: boolean,
    filters: filterType
}

const initialState: initState = {
    data: {},
    error: false,
    isLoading: false,
    filters: {}
};

export const getCsMeleeApi = createAsyncThunk(
    "csMeleePointer",
    async (filters: ValidationSchemaType, { rejectWithValue }) => {
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

const csMeleePointerSlice = createSlice({
    name: "csMeleePointer",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCsMeleeApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getCsMeleeApi.fulfilled, (state, action) => {
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
            .addCase(getCsMeleeApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

export const { resetState } = csMeleePointerSlice.actions;
export const { setFilters } = csMeleePointerSlice.actions;
const getCsMeleeReducer = csMeleePointerSlice.reducer;
export default getCsMeleeReducer;