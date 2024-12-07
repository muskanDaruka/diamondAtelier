"use client";
import SidebarIcon from '@/components/base/SidebarIcon';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from '@iconify/react';
import React from 'react';
import ProfileDropDown from '@/components/Profile/ProfileDropDown';
import { VerifyUserRoutePermission } from '@/context/VerifyUserRoutePermission';
import { RootState } from "@/redux/combineReducer";
import { useAppSelector } from '@/redux/ReduxHook';
import { Tooltip } from '@mui/material';
import { IoMdCart } from 'react-icons/io';

const UserType = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data, isLoading } = useAppSelector(
    (store: RootState) => store?.getCartDataReducer
  );
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUserName] = useState<string>("");
  const [partyrole, setPartyRole] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [mobile, setMobile] = useState('')

  useEffect(() => {
    const username = localStorage.getItem("username") || ""
    setUserName(username)
  }, [])

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    const storedPartyrole = localStorage.getItem("userType") || "";
    const storedSellerName = localStorage.getItem("seller_name") || "";
    const storedMobileNo = localStorage.getItem("seller_mobile_no") || "";


    setUserName(storedUsername);
    setPartyRole(storedPartyrole);
    setSellerName(storedSellerName);
    setMobile(storedMobileNo);
  }, []);

  return (
    <div className="flex font-serif h-screen flex-col">
      <section className="flex w-full bg-[#f0f0f0] justify-between px-14">
        <div
          onClick={() => router.push("/certified-stone")}
          className="py-4 text-black flex justify-center flex-col items-center bg-[#f0f0f0] space-y-3 cursor-pointer"
        >
          <Icon icon="ion:home" className="size-7" />
        </div>
        <div className="text-xl uppercase flex items-center lg:ml-32 cursor-pointer font-serif">
          DIAMOND ATELIER
        </div>
        <div
          className="col-span-2 lg:flex items-center justify-center hidden cursor-pointer relative"
        >
          <div className="flex items-end gap-3">
            <Tooltip
              title="Cart"
              placement="bottom"
              arrow
            >
              <div className="relative">
                <IoMdCart
                  size={29}
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
                <span className={`absolute rounded-full px-[5px] py-[1px] bg-blue-600 z-2 text-white top-0 end-0 transfrom translate-y-[-50%] translate-x-[50%] text-xs`}>{data?.Table?.length}</span>
              </div>
            </Tooltip>
            <div>
              <Tooltip
                title="Profile"
                placement="bottom"
                arrow
              >
                <Icon
                  icon="ic:baseline-person"
                  className="lg:size-8 size-6"
                  onClick={() => setShowProfile((prev) => !prev)}
                />
              </Tooltip>
            </div>
            <div className="font-bold lg:text-base text-sm">
              <p className="tracking-wide text-center">{username.toUpperCase() || ""}</p>
              <p className="tracking-wide text-center">
                {partyrole === "BUYER"
                  ? `SalesPerson : ${sellerName}`
                  : ""}
              </p>
              <p className="tracking-wide text-center">
                {
                  partyrole === "BUYER"
                    ? `${mobile}`
                    : ""
                }
              </p>
            </div>
          </div>
          {/* {showLogout && (
              <div
                className="absolute top-full mt-2 w-18 bg-bg-blue-700 rounded-lg shadow-lg z-10"
                onClick={handleLogout}
              >
                <button className="block w-full px-4 py-2 text-sm bg-blue-700 text-left text-white hover:bg-blue-600 hover:text-white">
                  Logout
                </button>
              </div>
            )} */}
          {showProfile && (
            <div className="absolute w-32 top-8 mt-4 bg-white rounded-xl shadow-lg z-10 mr-4 font-serif">
              <ProfileDropDown isOpen={showProfile} onClose={() => setShowProfile(false)} />
            </div>
          )}
        </div>
      </section>
      <section className=" flex flex-1 overflow-hidden bg-white">
        <SidebarIcon />
        <div className="relative flex flex-1 flex-col overflow-y-auto">
          <main className="flex-1 h-full">
            <VerifyUserRoutePermission>
              {children}
            </VerifyUserRoutePermission>
          </main>
        </div>
      </section>
    </div>
  )
}

export default UserType
