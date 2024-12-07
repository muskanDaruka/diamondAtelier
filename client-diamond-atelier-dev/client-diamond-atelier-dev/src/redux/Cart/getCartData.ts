import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";

type PropType = {
  packetno?: string;
  username: string;
  isactive: number;
  is_own_list:boolean
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

export const getCartDataApi = createAsyncThunk(
  "getCartData",
  async (data:PropType, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/CartData/GetCartData?USER_NAME=${data.username}&IS_ACTIVE=${1}&IS_OWN_CART=${data.is_own_list||false}`);
      localStorage.setItem("cartCount",response?.data?.Table?.length);
      return await response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const getCartDataSlice = createSlice({
  name: "getCartData",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartDataApi.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getCartDataApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getCartDataApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

const getCartDataReducer = getCartDataSlice.reducer;
export default getCartDataReducer;
