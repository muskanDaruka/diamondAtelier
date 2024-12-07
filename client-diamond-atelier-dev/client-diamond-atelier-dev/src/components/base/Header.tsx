"use client";
import img1 from "@/components/images/HeaderImages/1.jpg";
import img10 from "@/components/images/HeaderImages/10.jpg";
import img11 from "@/components/images/HeaderImages/11.jpg";
import img12 from "@/components/images/HeaderImages/12.jpg";
import img13 from "@/components/images/HeaderImages/13.jpg";
import img14 from "@/components/images/HeaderImages/14.jpg";
import img15 from "@/components/images/HeaderImages/15.jpg";
import img16 from "@/components/images/HeaderImages/16.jpg";
import img17 from "@/components/images/HeaderImages/17.jpg";
import img18 from "@/components/images/HeaderImages/18.jpg";
import img19 from "@/components/images/HeaderImages/19.jpg";
import img2 from "@/components/images/HeaderImages/2.jpg";
import img20 from "@/components/images/HeaderImages/20.jpg";
import img21 from "@/components/images/HeaderImages/21.jpg";
import img22 from "@/components/images/HeaderImages/22.jpg";
import img23 from "@/components/images/HeaderImages/23.jpg";
import img3 from "@/components/images/HeaderImages/3.jpg";
import img4 from "@/components/images/HeaderImages/4.jpg";
import img5 from "@/components/images/HeaderImages/5.jpg";
import img6 from "@/components/images/HeaderImages/6.jpg";
import img7 from "@/components/images/HeaderImages/7.jpg";
import img8 from "@/components/images/HeaderImages/8.jpg";
import img9 from "@/components/images/HeaderImages/9.jpg";
import { Icon } from "@iconify/react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProfileDropDown from "../Profile/ProfileDropDown";
import { IoMdCart } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import { getCartDataApi } from "@/redux/Cart/getCartData";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { RootState } from "@/redux/combineReducer";
import { FormProvider, useForm } from "react-hook-form";
import GlobalSearch from "../common/GlobalSearch";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const { data, isLoading } = useAppSelector(
    (store: RootState) => store?.getCartDataReducer
  );
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUserName] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [selectedOption, setSelectedOption] = useState("");
  const [partyrole, setPartyRole] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [mobile, setMobile] = useState('')
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const HeaderImages = [
    { img: img1, alt: "1" },
    { img: img2, alt: "2" },
    { img: img3, alt: "3" },
    { img: img4, alt: "4" },
    { img: img5, alt: "5" },
    { img: img6, alt: "6" },
    { img: img7, alt: "7" },
    { img: img8, alt: "8" },
    { img: img9, alt: "9" },
    { img: img10, alt: "10" },
    { img: img11, alt: "11" },
    { img: img12, alt: "12" },
    { img: img13, alt: "13" },
    { img: img14, alt: "14" },
    { img: img15, alt: "15" },
    { img: img16, alt: "16" },
    { img: img17, alt: "17" },
    { img: img18, alt: "18" },
    { img: img19, alt: "19" },
    { img: img20, alt: "20" },
    { img: img21, alt: "21" },
    { img: img22, alt: "22" },
    { img: img23, alt: "23" },
  ];


  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      breakpoints: {
        "(max-width: 500px)": {
          loop: false,
          slides: {
            perView: 5,
            spacing: 10,
          },
        },
      },
      slides: {
        perView: 10,
        spacing: 10,
      },
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 1000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setOpenDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

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

  useEffect(() => {
    const username = localStorage.getItem("username") || ""
    setUserName(username)
    dispatch(
      getCartDataApi({
        username: username || "",
        isactive: 1,
        is_own_list: true
      })
    );
  }, [])

  return (
      <div
        className="py-2 flex items-center bg-[#f0f0f0] cursor-pointer"
        style={{
          height: "140px",
        }}
      >
        <div className="grid lg:grid-cols-12 mt-5">
          <div ref={ref} className="keen-slider col-span-9">
            {HeaderImages.map((image, index) => (
              <div key={index} className="keen-slider__slide">
                <Image
                  src={image.img}
                  alt={image.alt}
                  className="border border-gray-300 rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="col-span-3 lg:flex items-center justify-center hidden cursor-pointer relative">
            <div>
              <div className="flex items-end gap-2">
                <Tooltip title="Cart" placement="bottom" arrow>
                  <div className="relative">
                    <IoMdCart
                      className="lg:w-6 lg:h-6 w-6 h-6"
                      onClick={() => {
                        push("/cart");
                      }}
                    />
                    <span className={`absolute rounded-full px-[5px] py-[1px] bg-blue-600 z-2 text-white top-0 end-0 transfrom translate-y-[-50%] translate-x-[50%] text-xs`}>{data?.Table?.length}</span>
                  </div>
                </Tooltip>
                <Tooltip title="Profile" placement="bottom" arrow>
                  <Icon
                    icon="ic:baseline-person"
                    className="lg:size-6 size-6"
                    onClick={() => setShowProfile((prev) => !prev)}
                  />
                </Tooltip>
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
              <GlobalSearch/>
            </div>
            {showProfile && (
              <div className="absolute w-32 top-8 mt-6 bg-white rounded-xl shadow-lg z-10">
                <ProfileDropDown isOpen={showProfile} onClose={() => setShowProfile(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Header;
