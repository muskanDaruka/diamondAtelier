import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

type PropType = {
    username:string;
    partyrole: string;
    mobileno: string;
    companyName:string;
    emailid: string;
    Flag?:string;
};

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

export const getUserDetailApi = createAsyncThunk(
  "getUserDetail",
  async (data:PropType, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/User/GetUserGetData",data);
      return await response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const getUserDetailSlice = createSlice({
  name: "getUserDetail",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailApi.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getUserDetailApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getUserDetailApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

const getUserDetailReducer = getUserDetailSlice.reducer;
export default getUserDetailReducer;
