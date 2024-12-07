"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Style from "@/Style/Auth.module.css";
import signUpImg from "@/components/images/SignUp/SignUp_vector.png"
import { useSelector } from "react-redux";
import { getKycMasterApi } from "@/redux/SignUp/getKycMasterReducer";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { signUpApi } from "@/redux/SignUp/signUpReducer"
import { getAllCountryApi } from "@/redux/SignUp/getAllCountryReducer";
import { RootState } from "@/redux/combineReducer";
import { useAppDispatch } from "@/redux/ReduxHook";
import { useRouter } from "next/navigation";
import axios from "axios";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

type SignUpFields = {
  userName: string;
  emailid: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  designation: string;
  mobileNo: string;
  companyName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  businesstypeId: string;
  countryId: string;
  isDiamondMfg: boolean;
  isWholeseller: boolean;
  isJeweller: boolean;
  businessMobileNo: string;
  whatsappNo: string;
  companyEMailId: string;
  website: string;
  gstNo: string;
  isIndividual: boolean;
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
  iS_MANUFACTURE: string;
  iS_WHOLESALER:  string;
  iS_JEWELLER:  string;
  iS_INDIVIDUAL: string;
  fRefEdit:  string;
  fRefLimit:  string;
  fRefAddress:  string;
  sRefEdit:  string;
  sRefLimit:  string;
  sRefAddress:  string;
  tRefEdit:  string;
  tRefLimit:  string;
  tRefAddress: string;
  fouRefEdit: string;
  fouRefLimit: string;
  fouRefAddress: string;
  fifRefEdit: string;
  fifRefLimit: string;
  fifRefAddress: string;
  partyrole: string;
  wPartyCode:number;
}

const schema = z.object({
  userName: z.string().min(1, "Username is required"),
  emailid: z.string().email("Invalid email address").min(1, "Email is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").min(6, "Password is required"),
  confirmPassword: z.string().min(6, "Confirm Password is required"),
  designation: z.string().min(1, "Designation is required"),
  whatsappNo: z.string().min(6, "Whatsapp number is required").max(15, "Not a valid Number").regex(/^\+?\d+(\s\d+)*$/, "Whatsapp number must contain only numbers and can include spaces and an optional plus sign"),
  mobileNo: z.string().min(6, "Mobile number is required").max(15, "Not a valid Number").regex(/^\+?\d+(\s\d+)*$/, "Mobile number must contain only numbers and can include spaces and an optional plus sign"),
  companyName: z.string().min(1, "Company name is required"),
  address1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
  countryId: z.string().min(1, "Country is required").refine(val => val !== "", {
    message: "Please select a valid country",
  }),
  businesstypeId: z.string().min(1, "Business Type is required").refine(val => val !== "", {
    message: "Please select a valid business type",
  }),
  businessMobileNo: z.string().min(6, "Mobile number is required").max(15, "Not a valid Number").regex(/^\+?\d+(\s\d+)*$/, "Mobile number must contain only numbers and can include spaces and an optional plus sign"),
  gstNo: z.string().min(1, "Gst/Tax/Inco-operation number is required"),
  fRefCompanyName: z.string().min(1, "Ref Company name is required"),
  fRefContactPerson: z.string().min(1, "Ref Company person name is required"),
  fRefContactNumber: z.string().min(6, "Ref Company number is required").max(15, "Not a valid Number").regex(/^\+?\d+(\s\d+)*$/, "Contact number must contain only numbers and can include spaces and an optional plus sign"),
  fRefEmailAddress: z.string().email("Invalid email address").min(1, "Ref Company email is required"),
  sRefCompanyName: z.string().min(1, "Ref Company name is required"),
  sRefContactPerson: z.string().min(1, "Ref Company  person name is required"),
  sRefContactNumber: z.string().min(6, "Ref Company number is required").max(15, "Not a valid Number").regex(/^\+?\d+(\s\d+)*$/, "Contact number must contain only numbers and can include spaces and an optional plus sign"),
  sRefEmailAddress: z.string().email("Invalid email address").min(1, "Ref Company email is required"),
  tRefCompanyName: z.string().min(1, "Ref Company name is required"),
  tRefContactPerson: z.string().min(1, "Ref Company person name is required"),
  tRefContactNumber: z.string().min(6, "Ref Company number is required").max(15, "Not a valid Number").regex(/^\+?\d+(\s\d+)*$/, "Contact number must contain only numbers and can include spaces and an optional plus sign"),
  tRefEmailAddress: z.string().email("Invalid email address").min(1, "Ref Company email is required"),
  isDiamondMfg: z.boolean(),
  isWholeseller: z.boolean(),
  isJeweller: z.boolean(),
  isIndividual: z.boolean(),
  partyrole: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      data.isDiamondMfg || data.isWholeseller || data.isJeweller|| data.isIndividual,
    {
      message: "At least one checkbox must be selected",
      path: ["isDiamondMfg"],
    }
  );

const defaultValues = {
  "wPartyCode": 0,
  "userName": "",
  "emailid": "",
  "firstName": "",
  "lastName": "",
  "password": "",
  "confirmPassword": "",
  "designation": "",
  "mobileNo": "",
  "companyName": "",
  "isDiamondMfg": false,
  "isWholeseller": false,
  "isJeweller": false,
  "isIndividual": false,
  "address1": "",
  "address2": "",
  "city": "",
  "state": "",
  "pincode": "",
  "countryId": "",
  "businessMobileNo": "",
  "whatsappNo": "",
  "companyEMailId": "",
  "website": "",
  "businesstypeId": "",
  "gstNo": "",
  "partyrole": "",
  "fRefCompanyName": "",
  "fRefContactPerson": "",
  "fRefContactNumber": "",
  "fRefEmailAddress": "",
  "sRefCompanyName": "",
  "sRefContactPerson": "",
  "sRefContactNumber": "",
  "sRefEmailAddress": "",
  "tRefCompanyName": "",
  "tRefContactPerson": "",
  "tRefContactNumber": "",
  "tRefEmailAddress": "",
  "fouRefCompanyName": "",
  "fouRefContactPerson": "",
  "fouRefContactNumber": "",
  "fouRefEmailAddress": "",
  "fifRefCompanyName": "",
  "fifRefContactPerson": "",
  "fifRefContactNumber": "",
  "fifRefEmailAddress": "",
  "iS_MANUFACTURE": "",
  "iS_WHOLESALER":"",
  "iS_JEWELLER": "",
  "iS_INDIVIDUAL": "",
  "userCode": "",
  "orgtypeId": "",
  "createdby": "",
  "modifyby": "",
}

const SignUp = () => {
  const [hide, setHide] = useState<boolean>(false);
  const [passHide, setPassHide] = useState<boolean>(false);
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useSelector(
    (state: RootState) => state.getAllCountryReducer
  );
  const { data: kyc } = useSelector((state: RootState) => state.getKycMasterReducer);
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFields>({ resolver: zodResolver(schema), defaultValues });

  const pincode = watch("pincode");
  const fetchCityAndState = async (zip: string) => {
    try {
      const countryCode = determineCountryCode(zip);
      let response;
      if (!countryCode) {
        setValue("city", "");
        setValue("state", "");
        return;
      }
      if (countryCode === "uk") {
        response = await axios.get(`https://api.postcodes.io/postcodes/${zip}`);
        const place = response.data.result;
        setValue("city", place.admin_district || "");
        setValue("state", place.region || "");
      } else if (countryCode === "in") {
        response = await axios.get(`https://api.zippopotam.us/${countryCode}/${zip}`);
        const place = response.data.places[0];
        setValue("city", place["place name"] || "");
        setValue("state", place["state"] || "");
      } else {
        response = await axios.get(`https://api.zippopotam.us/${countryCode}/${zip}`);
        const place = response.data.places[0];
        setValue("city", place["place name"] || "");
        setValue("state", place["state"] || "");
      }
    } catch (error) {
      setValue("city", "");
      setValue("state", "");
    }
  };
  const determineCountryCode = (zip: string) => {
    if (/^\d{5}(-\d{4})?$/.test(zip)) {
      return "us";
    } else if (/^\d{6}$/.test(zip)) {
      return "in";
    } else if (/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/.test(zip)) {
      return "uk";
    }
  };
  const userRoleOptions = [
    { id: "BUYER", value: "BUYER", label: "Buyer" },
    // { id: "SELLER", value: "SELLER", label: "Seller" },
    // { id: "ADMINSELLER", value: "ADMINSELLER", label: "Admin Seller" },
    // { id: "SUPERADMIN", value: "SUPERADMIN", label: "Super Admin" },
  ];
  const designationOptions = [
    { id: "Directer", value: "Directer", label: "Directer" },
    { id: "Owner", value: "Owner", label: "Owner" },
    { id: "SalesExecutive", value: "SalesExecutive", label: "Sales Executive" },
    { id: "PurchaseManager", value: "PurchaseManager", label: "Purchase Manager" },
  ]
  const onSubmit = (data: SignUpFields): void => {
    dispatch(signUpApi(data))
    toast.success("User registered successfully", { duration: 7000 });
    router.push("/");
  }
  useEffect(() => {
    dispatch(getAllCountryApi());
    dispatch(getKycMasterApi());
  }, [dispatch]);

  useEffect(() => {
    if (pincode && pincode.length > 0) {
      fetchCityAndState(pincode)
    }
  }, [pincode]);

  return (
    <section className={` ${Style.signUpBackground} lg:p-10 p-4 `}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-6">
          <div className=" mt-16">
            <div className="flex lg:w-2/3 my-4 bg-[#cfcfcf] lg:ml-24 rounded-3xl">
              <div className="w-full lg:p-8 p-4 rounded-3xl shadow-lg">
                <h1 className="font-bold font-serif text-center text-[30px] mb-4">User KYC</h1>
                <div className="mb-4">
                  <label htmlFor="uname" className="font-bold font-serif block mb-1 ml-4">UserName
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your UserName"
                    {...register('userName')}
                  />
                  {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="fname" className="font-bold font-serif block mb-1 ml-4">First Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your firstName"
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="lname" className="font-bold font-serif block mb-1 ml-4">Last Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Last Name"
                    {...register('lastName')}
                  />
                  {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="font-bold font-serif ml-4 block mb-1">Email
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Email"
                    {...register('emailid')}
                  />
                  {errors.emailid && <p className="text-red-500">{errors.emailid.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="pass" className="font-bold font-serif ml-4 block mb-1">Password
                    <span className="text-red-500">*</span>
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
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPass" className="font-bold font-serif ml-4 block mb-1">
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={!passHide ? "password" : "text"}
                      id="confirmPassword"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />
                    {passHide ? (
                      <FaRegEye
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setPassHide(!passHide)}
                      />
                    ) : (
                      <FaRegEyeSlash
                        onClick={() => setPassHide(!passHide)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      />
                    )}
                  </div>
                  {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="number" className="font-bold font-serif ml-4 block mb-1">Number
                    <span className="text-red-500">*</span>
                  </label>
                  <div>
                    <Controller
                      name="mobileNo"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          placeholder="Enter phone number"
                          id="mobileNo"
                          name="mobileNo"
                          className={`rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                          value={field.value}
                          onChange={
                            field.onChange
                          }
                        />
                      )}
                    />
                  </div>
                  {errors.mobileNo && <p className="text-red-500">{errors.mobileNo.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="role" className="font-bold font-serif ml-4 block mb-1">User Role
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    {...register('partyrole')}
                  >
                    <option value="">Choose your Role</option>
                    {userRoleOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center p-2 mt-32">
              <Image
                src={signUpImg}
                alt="signup"
                className="w-[516.8px] lg:h-[344.7px]"
                width={516.8}
                height={344.7}
              />
            </div>
          </div>
          <div className="mt-12">
            <div className="flex justify-evenly items-center mb-6">
              <h1 className="font-bold font-serif text-3xl text-center">User Business</h1>
              <Link href="/">
                <span className="text-blue-600 font-serif">Back to Login</span>
              </Link>
            </div>
            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label htmlFor="businessName" className="block mb-1 ml-4 font-serif font-bold text-sm">BUSINESS NAME
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Business Name"
                    id="businessName"
                    {...register('companyName')}
                  />
                  {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
                </div>
                <div className="">
                  <div className="flex">
                    <div className="mt-4">
                      <input type="checkbox" id="individual" {...register("isIndividual")} />
                      <label htmlFor="individual" className="ml-2 font-bold font-serif text-sm">GROWER</label>
                    </div>
                    <div className="mt-4 ml-2">
                      <input type="checkbox" id="diamondManufacturer" {...register("isDiamondMfg")}/>
                      <label htmlFor="diamondManufacturer" className="ml-2 font-bold font-serif text-sm">MANUFACTURER</label>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mb-3">
                      <input type="checkbox" id="jeweller" {...register("isJeweller")}/>
                      <label htmlFor="jeweller" className="ml-2 font-bold font-serif text-sm">JEWELLER</label>
                    </div>
                    <div className="mb-3 ml-2">
                      <input type="checkbox" id="wholesaler" {...register("isWholeseller")}/>
                      <label htmlFor="wholesaler" className="ml-2 font-bold font-serif text-sm">WHOLESALER</label>
                    </div>
                  </div>
                  {errors.isDiamondMfg && <p className="text-red-500">{errors.isDiamondMfg.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label htmlFor="ownerName" className="block mb-1 ml-4 font-serif font-bold text-sm">OWNER NAME
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Owner Name"
                    id="ownerName"
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="">
                  <label htmlFor="designation" className="block mb-1 ml-4 font-serif font-bold text-sm">DESIGNATION
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    {...register('designation')}
                  >
                    <option value="">Choose your Designation</option>
                    {designationOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block mb-1 ml-4 font-bold font-serif text-sm">ADDRESS LINE 1
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Office No. / Street No. / Street Name"
                  id="address1"
                  {...register('address1')}
                />
                {errors.address1 && <p className="text-red-500">{errors.address1.message}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block mb-1 ml-4 font-bold font-serif text-sm">ADDRESS LINE 2
                </label>
                <input
                  type="text"
                  className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Apartment / Unit No."
                  id="address2"
                  {...register('address2')}
                />
                {errors.address2 && <p className="text-red-500">{errors.address2.message}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="">
                  <label htmlFor="country" className="block mb-1 ml-4 font-bold font-serif text-sm">COUNTRY
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    {...register('countryId')}
                  >
                    <option value="">Country</option>
                    {data?.Table?.map((item: any) => (
                      <option key={item?.ISD_CODE} value={item?.SEQ_NO}>{item?.NAME}</option>
                    ))}
                  </select>
                  {errors.countryId && <p className="text-red-500">{errors.countryId.message}</p>}
                </div>
                <div className="">
                  <label htmlFor="zipCode" className="block mb-1 ml-4 font-bold font-serif text-sm">ZIP CODE
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Zip Code"
                    id="zipCode"
                    {...register('pincode')}
                  />
                  {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}
                </div>
                <div className="">
                  <label htmlFor="city" className="block mb-1 ml-4 font-bold font-serif text-sm">CITY
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your City name"
                    id="city"
                    {...register('city')}
                  />
                  {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                </div>
                <div className="">
                  <label htmlFor="state" className="block mb-1 ml-4 font-bold font-serif text-sm">State
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your State name"
                    id="state"
                    {...register('state')}
                  />
                  {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label htmlFor="businessMobileNo" className="block mb-1 font-serif ml-4 font-bold text-sm">MOBILE NO.
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="businessMobileNo"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        placeholder="Enter phone number"
                        id="businessMobileNo"
                        name="businessMobileNo"
                        className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={field.value}
                        onChange={
                          field.onChange
                        }
                      />
                    )}
                  />
                  {errors.businessMobileNo && <p className="text-red-500">{errors.businessMobileNo.message}</p>}
                </div>
                <div className="">
                  <label htmlFor="whatsappNo." className="block mb-1 font-serif ml-4 font-bold text-sm">WHATSAPP NO.
                    <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="whatsappNo"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        placeholder="Enter phone number"
                        id="whatsappNo"
                        name="whatsappNo"
                        className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={field.value}
                        onChange={
                          field.onChange
                        }
                      />
                    )}
                  />
                  {errors.whatsappNo && <p className="text-red-500">{errors.whatsappNo.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label htmlFor="co-email" className="block mb-1 font-serif ml-4 font-bold text-sm">COMPANY EMAIL ADDRESS</label>
                  <input
                    type="email"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company's Email Id"
                    id="companyEMailId"
                    {...register('companyEMailId')}
                  />
                  {errors.companyEMailId && <p className="text-red-500">{errors.companyEMailId.message}</p>}
                </div>
                <div className="">
                  <label htmlFor="website" className="block mb-1 ml-4 font-serif font-bold text-sm">WEBSITE</label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Website URL"
                    id="website"
                    {...register('website')}
                  />
                  {errors.website && <p className="text-red-500">{errors.website.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label htmlFor="tax" className="block mb-1 ml-4 font-serif font-bold text-sm">TAX ID/ GST/ INCO-OPERATION NO.
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="TAX ID/ GST/ INCO-OPERATION NO."
                    id="tax"
                    {...register('gstNo')}
                  />
                  {errors.gstNo && <p className="text-red-500">{errors.gstNo.message}</p>}
                </div>
                <div className="">
                  <label htmlFor="businessType" className="block mb-1 font-serif ml-4 font-bold text-sm">BUSINESS TYPE
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    {...register("businesstypeId")}
                  >
                    <option value="">Business Type</option>
                    {kyc?.Table?.map((item: any) => {
                      return (
                        <option key={item?.KYCTypeID} value={item?.KYCTypeID}>
                          {item?.KYCTypeDesc}
                        </option>
                      );
                    })}
                  </select>
                  {errors.businesstypeId && <p className="text-red-500">{errors.businesstypeId.message}</p>}
                </div>
              </div>
              <div>
                <label className="block mb-2 ml-2 font-bold text-sm font-serif">TRADE REFERENCE 1
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Company Name</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefCompanyName')}
                    />
                    {errors.fRefCompanyName && <p className="text-red-500">{errors.fRefCompanyName.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefContactPerson')}
                    />
                    {errors.fRefContactPerson && <p className="text-red-500">{errors.fRefContactPerson.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefContactNumber')}
                    />
                    {errors.fRefContactNumber && <p className="text-red-500">{errors.fRefContactNumber.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefEmailAddress')}
                    />
                    {errors.fRefEmailAddress && <p className="text-red-500">{errors.fRefEmailAddress.message}</p>}
                  </div>
                </div>

                <label className="block font-serif font-bold text-sm ml-2 mb-2">
                  TRADE REFERENCE 2 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Company Name</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefCompanyName')}
                    />
                    {errors.sRefCompanyName && <p className="text-red-500">{errors.sRefCompanyName.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefContactPerson')}
                    />
                    {errors.sRefContactPerson && <p className="text-red-500">{errors.sRefContactPerson.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefContactNumber')}
                    />
                    {errors.sRefContactNumber && <p className="text-red-500">{errors.sRefContactNumber.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefEmailAddress')}
                    />
                    {errors.sRefEmailAddress && <p className="text-red-500">{errors.sRefEmailAddress.message}</p>}
                  </div>
                </div>
                <label className="block font-serif font-bold text-sm ml-2 mb-2">
                  TRADE REFERENCE 3 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Company Name</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefCompanyName')}
                    />
                    {errors.tRefCompanyName && <p className="text-red-500">{errors.tRefCompanyName.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefContactPerson')}
                    />
                    {errors.tRefContactPerson && <p className="text-red-500">{errors.tRefContactPerson.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefContactNumber')}
                    />
                    {errors.tRefContactNumber && <p className="text-red-500">{errors.tRefContactNumber.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefEmailAddress')}
                    />
                    {errors.tRefEmailAddress && <p className="text-red-500">{errors.tRefEmailAddress.message}</p>}
                  </div>
                </div>

                <label className="block font-bold font-serif text-sm ml-2 mb-2">
                  TRADE REFERENCE 4
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Company Name</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefCompanyName')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefContactPerson')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefContactNumber')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefEmailAddress')}
                    />
                  </div>
                </div>
                <label className="block font-bold font-serif text-sm ml-2 mb-2">
                  TRADE REFERENCE 5
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Company Name</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fifRefCompanyName')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fifRefContactPerson')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fifRefContactNumber')}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fifRefEmailAddress')}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-40 h-10 bg-blue-600 text-white font-serif rounded-3xl font-bold"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section >
  );
}

export default SignUp;
