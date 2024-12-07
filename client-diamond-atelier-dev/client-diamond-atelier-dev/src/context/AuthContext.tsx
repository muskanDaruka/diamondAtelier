"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token || token == null || token == "") {
      router.replace("/");
      toast.error("Unauthorized ! Please login again",{
        duration:3000
      });
    } 
  }, [router]);

  return <>{children}</>;
};
