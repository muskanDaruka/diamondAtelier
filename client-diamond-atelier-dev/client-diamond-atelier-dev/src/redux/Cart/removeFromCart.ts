import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

type PropType = {
  packetno: string;
  username: string;
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

export const removeFromCartApi = createAsyncThunk(
  "removeFromCart",
  async (data:PropType, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/CartData/RemoveCartData?PACKET_NO=${data.packetno}&USER_NAME=${data.username}`);
      return await response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const removeFromCartSlice = createSlice({
  name: "removeFromCart",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeFromCartApi.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(removeFromCartApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(removeFromCartApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

const removeFromCartReducer = removeFromCartSlice.reducer;
export default removeFromCartReducer;
