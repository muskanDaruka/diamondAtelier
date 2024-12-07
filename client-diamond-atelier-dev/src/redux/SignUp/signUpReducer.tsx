import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import instance from "../../Config/axios.config"
import toast from "react-hot-toast";

interface SignUpState {
  data: any;
  error: boolean;
  isLoading: boolean;
}

const initialState: SignUpState = {
  data:{},
  error:false,
  isLoading:false
}

type SignUpFields = {
  designation: string;
  companyName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  businesstypeId: string;
  countryId: string;
  businessMobileNo: string;
  whatsappNo: string;
  companyEMailId: string;
  website: string;
  gstNo: string;
  fRefCompanyName: string;
  fRefContactPerson: string;
  fRefContactNumber: string;
  fRefEmailAddress: string;
  sRefCompanyName: string;
  sRefContactPerson: string;
  sRefContactNumber: string;
  sRefEmailAddress: string;
  tRefCompanyName: string;
  tRefContactPerson: string;
  tRefContactNumber: string;
  tRefEmailAddress: string;
  fouRefCompanyName: string;
  fouRefContactPerson: string;
  fouRefContactNumber: string;
  fouRefEmailAddress: string;
  fifRefCompanyName: string;
  fifRefContactPerson: string;
  fifRefContactNumber: string;
  fifRefEmailAddress: string;
  fRefEdit?: string;
  fRefLimit?: string;
  fRefAddress?: string;
  sRefEdit?: string;
  sRefLimit?: string;
  sRefAddress?: string;
  tRefEdit?: string;
  tRefLimit?: string;
  tRefAddress?: string;
  fouRefEdit?: string;
  fouRefLimit?: string;
  fouRefAddress?: string;
  fifRefEdit?: string;
  fifRefLimit?: string;
  fifRefAddress?: string;
  wPartyCode?: number;
  userCode?: string;
  orgtypeId?: string;
  createdby?: string;
  modifyby?: string;
  flag?:string
};

export const signUpApi = createAsyncThunk(
  "SignUp",
  async(data: SignUpFields,{rejectWithValue}) =>{
      try {
          const response = await instance.post(`/User/SaveUserData`,data)
          // if(response.status === 200){
          //     toast.success("User registered successfully", {duration: 7000});
          // }
          return await response.data;
      } catch (error: any) {
          toast.error(error.message);
          rejectWithValue(error.response?.data);
      }
  }
);


const signUpSlice = createSlice({
  name:"SignUp",
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
      builder
            .addCase(signUpApi.pending,(state) => {
              state.isLoading = true;
              state.error = false;
            })
            .addCase(signUpApi.fulfilled, (state,action: PayloadAction<Record<string, any>>)=>{
              state.isLoading = false;
              state.data = action.payload;
              state.error = false;
            })
            .addCase(signUpApi.rejected,(state)=>{
              state.isLoading = false;
              state.error = true;
            })
  }
})


const signUpReducer = signUpSlice.reducer;
export default signUpReducer;