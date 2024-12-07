import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import toast from "react-hot-toast";
import { HiShoppingCart } from "react-icons/hi2";


type PropType = {
  packetno?: string;
  cartstatus: string;
  username: string;
  isactive: number;
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

export const addToCartApi = createAsyncThunk(
  "addtoCart",
  async (data:PropType, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/CartData/SaveAddCartData",
        data
      );
       if(response.data.status === "Success"){
        toast.success('Item(s) added to cart');
       }else{
        toast.error(response.data.errorMsg);
       }
      return await response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const addtoCartSlice = createSlice({
  name: "addtoCart",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartApi.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addToCartApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(addToCartApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

const addToCartReducer = addtoCartSlice.reducer;
export default addToCartReducer;
