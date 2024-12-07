import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

type PropType = {
    userName: string,
    isUserApproval: boolean,
    modifyby: string
}

interface initState {
    data: any;
    error: boolean;
    isLoading: boolean;
}

const initialState: initState = {
    data: [],
    error: false,
    isLoading: false,
};

export const getApprovedUserApi = createAsyncThunk(
    "getApprovedUser",
    async (data: PropType, { rejectWithValue }) => {
        try {
            const response = await instance.post(
                "/User/SaveUserApproval", data);
            return await response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const getApprovedUserSlice = createSlice({
    name: "getApprovedUser",
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApprovedUserApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(getApprovedUserApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.data = action.payload;
            })
            .addCase(getApprovedUserApi.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

const getApprovedUserReducer = getApprovedUserSlice.reducer;
export default getApprovedUserReducer;
