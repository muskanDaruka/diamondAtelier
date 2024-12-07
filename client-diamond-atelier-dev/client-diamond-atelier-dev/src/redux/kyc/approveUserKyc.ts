import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

type PropType = {
    userName: string,
    iS_KYC: boolean,
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

export const approveUserKycApi = createAsyncThunk(
  "approveUserKyc",
  async (data:PropType, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "User/SaveUserKYC",data);
      return await response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const approveUserKycApiSlice = createSlice({
  name: "approveUserKyc",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(approveUserKycApi.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(approveUserKycApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(approveUserKycApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

const approveUserKycReducer = approveUserKycApiSlice.reducer;
export default approveUserKycReducer;
