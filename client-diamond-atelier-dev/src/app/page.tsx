"use client";
import React, { useEffect } from "react";
import Style from "../Style/Auth.module.css";
import SignIn from "@/components/Auth/SignIn";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { signInApi } from "@/redux/SignIn/SignInReducer";
import { isTokenExpired } from "@/utils/tokenExpiry";


const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (data: { userName: string; password: string }) => {
    try {
      await dispatch(signInApi(data));
      localStorage.setItem("username", data.userName);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    const isExist = localStorage.getItem("Token")
    if (isExist && !isTokenExpired()) {
      window.location.href = "/category";
    }
  }, [])

  return (
    <div className={`${Style.main} h-screen flex flex-col justify-between pb-8`}>
      <div className="text-3xl font-bold text-center border-b-2 rounded-2xl py-6">
        DIAMOND ATELIER
      </div>
      <div className="py-5">
        <div className="text-4xl text-center mb-2">Welcome!</div>
        <div className="text-center text-lg font-semibold">
          to our family of 5000+ Jewelers and Dealers
        </div>
      </div>
      <div className={`${Style.loginBackground}`}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="py-4 w-full md:w-1/2 text-center">
            <div className="text-2xl mb-4">Not registered yet?</div>
            <Link
              href="./auth/sign-up"
              className="btn btn-primary rounded-full m-3 bg-blue-500 text-white px-4 py-2"
            >
              SignUp
            </Link>
          </div>
          <div className="hidden md:flex h-48 border-l border-blue-500 mx-4"></div>
          <div className="py-5 w-full md:w-1/2">
            <div className="text-2xl text-center mb-3">Already a member?</div>
            {/* <div className="text-center mt-1 text-[blue] font-bold underline">
              <Link href={"/admin-auth"}>Admin Login?</Link>
            </div> */}
            <SignIn onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
