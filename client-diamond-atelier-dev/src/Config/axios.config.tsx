import { clearToken, isTokenExpired } from "@/utils/tokenExpiry";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const Token = typeof window !== 'undefined' ? localStorage.getItem("Token") ?? null : null;



const instance : AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_baseURL,
  headers: {
     Authorization:`Bearer ${Token}`,
  }
});

instance.interceptors.response.use(
  function (config){
    return config;
  },
  function (error:AxiosError) {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  function (response:AxiosResponse) {
    if(isTokenExpired()){
      clearToken();
      window.location.href = "/";
    }
    if(response?.data?.message){
      toast.success(response?.data?.message);
    }
    return response;
  },
  function (error:AxiosError) { 
    if(isTokenExpired() || error.status == 401){
      clearToken();
      window.location.href = "/";
    }
      toast.error(error?.message);
    return Promise.reject(error);
  }
);

export default instance