"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    userName: z.string().min(1, "UserName is required"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

type ValidationSchemaType = z.infer<typeof schema>

const defaultValues = {
    "userName": "",
    "password": "",
    "wPartyCode":0,
}

const SignIn = ({ onSubmit } :{onSubmit:(arg: { userName: string; password: string })=>void}) => {
    const [hide, setHide] = useState<boolean>(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema),
        defaultValues
    });

    const handleForgotPassword = () => {
        router.push("./auth/forgot-pass")
    }

    return (
        <div className="w-full max-w-md mx-auto px-4 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-gray-700 text-sm font-semibold mb-2">
                        UserName
                    </label>
                    <input
                        type="text"
                        id="userName"
                        className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("userName")}
                    />
                    {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                        Password
                    </label>
                    <div className="relative">
                    <input
                      type={!hide ? "password" : "text"}
                      id="password"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Password"
                      {...register('password')}
                    />
                    {hide ? (
                      <FaRegEye
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setHide(!hide)}
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setHide(!hide)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="savePassword"
                            className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="savePassword" className="ml-2 text-gray-700 text-sm">
                            Save password
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-blue-600 text-sm"
                    >
                        Forgot Password?
                    </button>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white rounded-full px-6 py-2 text-sm font-semibold">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
