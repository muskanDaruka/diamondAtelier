import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../Config/axios.config";
import toast from "react-hot-toast";

type PropType = {
    userName?: string,
    companyName?: string,
    emailid?: string,
    mobileNo?: string,
    isUserApproval?: boolean,
    partyrole?: string,
    iS_KYC?: boolean
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

export const getKycApprovedUserApi = createAsyncThunk(
  "getKycApprovedUser",
  async (data:PropType, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/User/GetUserGetData",data);
        if(response.data.Table[0].error_stauts){
          window.location.href = "/certified-stone"
        }
      return await response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const getKycApprovedUserSlice = createSlice({
  name: "getKycApprovedUser",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKycApprovedUserApi.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getKycApprovedUserApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload;
      })
      .addCase(getKycApprovedUserApi.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

const getKycApprovedUserReducer = getKycApprovedUserSlice.reducer;
export default getKycApprovedUserReducer;
