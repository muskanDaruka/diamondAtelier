import instance from "@/Config/axios.config";
import { saveToken } from "@/utils/tokenExpiry";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface SignInState {
    data: Record<string, any>;
    error: boolean;
    isLoading: boolean;
    isAuthenticated: boolean;
}

interface SignInResponse {
    result: string;
}

const initialState: SignInState = {
    data: {},
    error: false,
    isLoading: false,
    isAuthenticated: false,

};



export const signInApi = createAsyncThunk(
    "SignIn",
    async (data: { userName: string; password: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://api.diamondatelier.in:6023/api/Login/login', data);
            if (response.status === 200 && response?.data?.result !== "" && response?.data?.result !== null && !response?.data?.error_status) {
                const expiry = response.data.expire_min + "min";
                saveToken(response.data.result, expiry);
                localStorage.setItem("wPartyCode", response.data.party_code);
                localStorage.setItem("userType", response.data.party_role);
                localStorage.setItem("PARTYRATE", JSON.stringify(response.data.party_rate))
                localStorage.setItem("seller_email_id", response.data.seller_email_id)
                localStorage.setItem("seller_mobile_no", response.data.seller_mobile_no)
                localStorage.setItem("seller_name", response.data.seller_name);
                localStorage.setItem("party_disc_per", response.data.party_disc_per);
                toast.success("User logged in successfully!!");
                setTimeout(() => {
                    window.location.href = "/category";
                }, 1000)
                return await response.data
            } else {
                toast.error(response?.data?.message);
                return rejectWithValue("Invalid username, password or approval pending");
            }
        } catch (error: any) {
            toast.error(error?.message)
        }
    }
);

const signInSlice = createSlice({
    name: "SignIn",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signInApi.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(signInApi.fulfilled, (state, action: PayloadAction<SignInResponse>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.isAuthenticated = true;
                state.error = false;
            })
            .addCase(signInApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            });
    }
});

const signInReducer = signInSlice.reducer;
export default signInReducer;
