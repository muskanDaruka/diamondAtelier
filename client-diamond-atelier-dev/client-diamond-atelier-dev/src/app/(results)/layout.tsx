"use client";
import "@fontsource-variable/montserrat";
import { Icon } from "@iconify/react";
import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SidebarIcon from "@/components/base/SidebarIcon";
import ProfileDropDown from "@/components/Profile/ProfileDropDown";
import { IoMdCart } from "react-icons/io";
import { Tooltip } from "@mui/material";
import { RootState } from "@/redux/combineReducer";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { useDispatch } from "react-redux";
import { getCartDataApi } from "@/redux/Cart/getCartData";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, isLoading } = useAppSelector(
    (store: RootState) => store?.getCartDataReducer
  );
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [username ,setUserName] = useState<string>("");
  const dispatch = useAppDispatch();
  const [partyrole, setPartyRole] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [mobile, setMobile] = useState('')
    
    useEffect(()=>{
      const username = localStorage.getItem("username")||""
      setUserName(username)
      dispatch(
        getCartDataApi({ 
          username:username || "",
          isactive: 1,
          is_own_list:true
        })
      );
    },[])
   

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
    <>
      <div className="flex font-serif h-screen flex-col h-[100vh]">
        <section className="flex w-full bg-[#f0f0f0] justify-between px-14">
          <div
            onClick={() => router.push("/certified-stone")}
            className="py-4 text-black flex justify-center flex-col items-center bg-[#f0f0f0] space-y-3 cursor-pointer"
          >
            <Icon icon="ion:home" className="size-7" />
          </div>
          <div className="text-xl uppercase flex items-center lg:ml-32 cursor-pointer font-serif">Diamond Atelier</div>
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
                fontSize={30}
                onClick={() => setShowProfile((prev) => !prev)}
              />
            </Tooltip>
            </div>
            <div className="font-semibold lg:text-base text-sm">
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
            {showProfile && (
            <div className="absolute w-32 top-8 mt-4 bg-white rounded-xl shadow-lg z-10 mr-4">
              <ProfileDropDown isOpen={showProfile} onClose={() => setShowProfile(false)}/>
            </div>
          )}
          </div>
        </section>
        <section className=" flex flex-1 overflow-hidden bg-white">
          <SidebarIcon />
          <div className="relative flex flex-1 flex-col overflow-y-auto">
            <main className="flex-1">{children}</main>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainLayout;
