"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Style from "@/Style/Auth.module.css";
import { useSelector } from "react-redux";
import { getKycMasterApi } from "@/redux/SignUp/getKycMasterReducer";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAllCountryApi } from "@/redux/SignUp/getAllCountryReducer";
import { RootState } from "@/redux/combineReducer";
import { useAppDispatch } from "@/redux/ReduxHook";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { getKycApprovedUserApi } from "@/redux/kyc/getKycApprovedUser";
import { useSearchParams } from "next/navigation";
import { signUpApi } from "@/redux/SignUp/signUpReducer";
import { approveUserKycApi } from "@/redux/kyc/approveUserKyc";

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
  isDiamondMfg: boolean;
  isWholeseller: boolean;
  isJeweller: boolean;
  isIndividual: boolean;
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
  fRefEdit: string;
  fRefLimit: string;
  fRefAddress: string;
  sRefEdit: string;
  sRefLimit: string;
  sRefAddress: string;
  tRefEdit: string;
  tRefLimit: string;
  tRefAddress: string;
  fouRefEdit: string;
  fouRefLimit: string;
  fouRefAddress: string;
  fifRefEdit: string;
  fifRefLimit: string;
  fifRefAddress: string;
  wPartyCode?: number;
  userCode?: string;
  orgtypeId?: string;
  createdby?: string;
  modifyby?: string;
  flag?:string
};

const defaultValues = {
  wPartyCode: 0,
  designation: "",
  companyName: "",
  isDiamondMfg: false,
  isWholeseller: false,
  isJeweller: false,
  isIndividual: false,
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  countryId: "",
  businessMobileNo: "",
  whatsappNo: "",
  companyEMailId: "",
  website: "",
  businesstypeId: "",
  gstNo: "",
  fRefCompanyName: "",
  fRefContactPerson: "",
  fRefContactNumber: "",
  fRefEmailAddress: "",
  sRefCompanyName: "",
  sRefContactPerson: "",
  sRefContactNumber: "",
  sRefEmailAddress: "",
  tRefCompanyName: "",
  tRefContactPerson: "",
  tRefContactNumber: "",
  tRefEmailAddress: "",
  fouRefCompanyName: "",
  fouRefContactPerson: "",
  fouRefContactNumber: "",
  fouRefEmailAddress: "",
  fifRefCompanyName: "",
  fifRefContactPerson: "",
  fifRefContactNumber: "",
  fifRefEmailAddress: "",
  fRefEdit: "",
  fRefLimit: "",
  fRefAddress: "",
  sRefEdit: "",
  sRefLimit: "",
  sRefAddress: "",
  tRefEdit: "",
  tRefLimit: "",
  tRefAddress: "",
  fouRefEdit: "",
  fouRefLimit: "",
  fouRefAddress: "",
  fifRefEdit: "",
  fifRefLimit: "",
  fifRefAddress: "",
  userCode: "",
  orgtypeId: "",
  createdby: "",
  modifyby: "",
};

const schema = z
  .object({
    designation: z.string().min(1, "Designation is required"),
    whatsappNo: z
      .string()
      .min(6, "Whatsapp number is required")
      .max(15, "Not a valid Number")
      .regex(
        /^\+?\d+(\s\d+)*$/,
        "Whatsapp number must contain only numbers and can include spaces and an optional plus sign"
      ),
    companyName: z.string().min(1, "Company name is required"),
    address1: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(1, "Pincode is required"),
    countryId: z.string().transform((val) => (val ? parseInt(val, 10) : null)),
    businesstypeId:  z.string().transform((val) => (val ? parseInt(val, 10) : null)),
    businessMobileNo: z
      .string()
      .min(6, "Mobile number is required")
      .max(15, "Not a valid Number")
      .regex(
        /^\+?\d+(\s\d+)*$/,
        "Mobile number must contain only numbers and can include spaces and an optional plus sign"
      ),
    gstNo: z.string().min(1, "Gst/Tax/Inco-operation number is required"),
    fRefCompanyName: z.string().min(1, "Ref Company name is required"),
    fRefContactPerson: z.string().min(1, "Ref Company person name is required"),
    fRefContactNumber: z
      .string()
      .min(6, "Ref Company number is required")
      .max(15, "Not a valid Number")
      .regex(
        /^\+?\d+(\s\d+)*$/,
        "Contact number must contain only numbers and can include spaces and an optional plus sign"
      ),
    fRefEmailAddress: z
      .string()
      .email("Invalid email address")
      .min(1, "Ref Company email is required"),
    sRefCompanyName: z.string().min(1, "Ref Company name is required"),
    sRefContactPerson: z
      .string()
      .min(1, "Ref Company  person name is required"),
    sRefContactNumber: z
      .string()
      .min(6, "Ref Company number is required")
      .max(15, "Not a valid Number")
      .regex(
        /^\+?\d+(\s\d+)*$/,
        "Contact number must contain only numbers and can include spaces and an optional plus sign"
      ),
    sRefEmailAddress: z
      .string()
      .email("Invalid email address")
      .min(1, "Ref Company email is required"),
    tRefCompanyName: z.string().min(1, "Ref Company name is required"),
    tRefContactPerson: z.string().min(1, "Ref Company person name is required"),
    tRefContactNumber: z
      .string()
      .min(6, "Ref Company number is required")
      .max(15, "Not a valid Number")
      .regex(
        /^\+?\d+(\s\d+)*$/,
        "Contact number must contain only numbers and can include spaces and an optional plus sign"
      ),
    tRefEmailAddress: z
      .string()
      .email("Invalid email address")
      .min(1, "Ref Company email is required"),
    isDiamondMfg: z.boolean(),
    isWholeseller: z.boolean(),
    isJeweller: z.boolean(),
    isIndividual: z.boolean(),
    fRefEdit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    fRefLimit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    fRefAddress: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    sRefEdit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    sRefLimit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    sRefAddress: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    tRefEdit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    tRefLimit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    tRefAddress: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    fouRefEdit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    fouRefLimit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    fouRefAddress: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    fifRefEdit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    fifRefLimit: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
    fifRefAddress: z
      .string()
      .min(1, "enter the detail")
      .max(200, "less than 200 character"),
  })
  .refine(
    (data) =>
      data.isDiamondMfg ||
      data.isWholeseller ||
      data.isJeweller ||
      data.isIndividual,
    {
      message: "At least one checkbox must be selected",
      path: ["isDiamondMfg"],
    }
  );

const KycApprovalDetail = () => {
  const { data } = useSelector(
    (state: RootState) => state.getAllCountryReducer
  );
  const { data: kyc } = useSelector(
    (state: RootState) => state.getKycMasterReducer
  );
  const { data: userKycDetail } = useSelector(
    (state: RootState) => state.getKycApprovedUserReducer
  );
  const dispatch = useAppDispatch();
  const params = useSearchParams();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFields>({
    resolver: zodResolver(schema),
    defaultValues,
    values: {
      wPartyCode: userKycDetail?.Table?.[0]?.WPartyCode,
      designation: userKycDetail?.Table?.[0]?.Designation,
      companyName: userKycDetail?.Table?.[0]?.CompanyName,
      isDiamondMfg: userKycDetail?.Table?.[0]?.IsDiamondMfg,
      isWholeseller: userKycDetail?.Table?.[0]?.IsWholeseller,
      isJeweller: userKycDetail?.Table?.[0]?.IsJeweller,
      isIndividual: userKycDetail?.Table?.[0]?.IsIndividual,
      address1: userKycDetail?.Table?.[0]?.Address1,
      address2: userKycDetail?.Table?.[0]?.Address2,
      city: userKycDetail?.Table?.[0]?.City,
      state: userKycDetail?.Table?.[0]?.State,
      pincode: userKycDetail?.Table?.[0]?.Pincode,
      countryId: userKycDetail?.Table?.[0]?.Country,
      businessMobileNo: userKycDetail?.Table?.[0]?.BusinessMobileNo,
      whatsappNo: userKycDetail?.Table?.[0]?.WhatsappNo,
      companyEMailId: userKycDetail?.Table?.[0]?.CompanyEMailId,
      website: userKycDetail?.Table?.[0]?.Website,
      businesstypeId: userKycDetail?.Table?.[0]?.BusinessType,
      gstNo: userKycDetail?.Table?.[0]?.GSTNo,
      fRefCompanyName: userKycDetail?.Table?.[0]?.FRefCompanyName,
      fRefContactPerson: userKycDetail?.Table?.[0]?.FRefContactPerson,
      fRefContactNumber: userKycDetail?.Table?.[0]?.FRefContactNumber,
      fRefEmailAddress: userKycDetail?.Table?.[0]?.FRefEmailAddress,
      sRefCompanyName: userKycDetail?.Table?.[0]?.SRefCompanyName,
      sRefContactPerson: userKycDetail?.Table?.[0]?.SRefContactPerson,
      sRefContactNumber: userKycDetail?.Table?.[0]?.SRefContactNumber,
      sRefEmailAddress: userKycDetail?.Table?.[0]?.SRefEmailAddress,
      tRefCompanyName: userKycDetail?.Table?.[0]?.TRefCompanyName,
      tRefContactPerson: userKycDetail?.Table?.[0]?.TRefContactPerson,
      tRefContactNumber: userKycDetail?.Table?.[0]?.TRefContactNumber,
      tRefEmailAddress: userKycDetail?.Table?.[0]?.TRefEmailAddress,
      fouRefCompanyName: userKycDetail?.Table?.[0]?.FouRefCompanyName,
      fouRefContactPerson: userKycDetail?.Table?.[0]?.FouRefContactPerson,
      fouRefContactNumber: userKycDetail?.Table?.[0]?.FouRefContactNumber,
      fouRefEmailAddress: userKycDetail?.Table?.[0]?.FouRefEmailAddress,
      fifRefCompanyName: userKycDetail?.Table?.[0]?.FifRefCompanyName,
      fifRefContactPerson: userKycDetail?.Table?.[0]?.FifRefContactPerson,
      fifRefContactNumber: userKycDetail?.Table?.[0]?.FifRefContactNumber,
      fifRefEmailAddress: userKycDetail?.Table?.[0]?.FifRefEmailAddress,
      fRefEdit: userKycDetail?.Table?.[0]?.FifRefEdit,
      fRefLimit: userKycDetail?.Table?.[0]?.FifRefLimit,
      fRefAddress: userKycDetail?.Table?.[0]?.FifRefAddress,
      sRefEdit: userKycDetail?.Table?.[0]?.SRefEdit,
      sRefLimit: userKycDetail?.Table?.[0]?.SRefLimit,
      sRefAddress: userKycDetail?.Table?.[0]?.SRefAddress,
      tRefEdit: userKycDetail?.Table?.[0]?.TRefEdit,
      tRefLimit: userKycDetail?.Table?.[0]?.tRefLimit,
      tRefAddress: userKycDetail?.Table?.[0]?.TRefAddress,
      fouRefEdit: userKycDetail?.Table?.[0]?.FouRefEdit,
      fouRefLimit: userKycDetail?.Table?.[0]?.FifRefEmailAddress,
      fouRefAddress: userKycDetail?.Table?.[0]?.FouRefAddress,
      fifRefEdit: userKycDetail?.Table?.[0]?.FifRefEdit,
      fifRefLimit: userKycDetail?.Table?.[0]?.FifRefLimit,
      fifRefAddress: userKycDetail?.Table?.[0]?.FifRefAddress,
      userCode: userKycDetail?.Table?.[0]?.UserCode,
    },
  });

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
        response = await axios.get(
          `https://api.zippopotam.us/${countryCode}/${zip}`
        );
        const place = response.data.places[0];
        setValue("city", place["place name"] || "");
        setValue("state", place["state"] || "");
      } else {
        response = await axios.get(
          `https://api.zippopotam.us/${countryCode}/${zip}`
        );
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

  const designationOptions = [
    { id: "Directer", value: "Directer", label: "Directer" },
    { id: "Owner", value: "Owner", label: "Owner" },
    { id: "SalesExecutive", value: "SalesExecutive", label: "Sales Executive" },
    { id: "PurchaseManager", value: "PurchaseManager", label: "Purchase Manager" },
  ]

  const onSubmit = (data: SignUpFields): void => {
    data.flag = "U";
    dispatch(signUpApi(data)).then(()=>{
      dispatch(approveUserKycApi(
        {
          userName: params.get("username")||"",
          iS_KYC: true,
          modifyby: localStorage.getItem("username")||""
       }
      ))
    });
  };

  useEffect(() => {
    dispatch(getAllCountryApi());
    dispatch(getKycMasterApi());
    dispatch(
      getKycApprovedUserApi({
        iS_KYC: false,
        userName: params.get("username") || "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (pincode && pincode.length > 0) {
      fetchCityAndState(pincode);
    }
  }, [pincode]);

  return (
    <section className={`${Style.signUpBackground}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-10 flex justify-center items-center pt-5 p-64 pb-5">
          <div className="">
            <div className="flex justify-evenly items-center mb-6">
              <h1 className="font-bold font-serif text-3xl text-center">
                User Business
              </h1>
              <Link href="/">
                <span className="text-blue-600 font-serif">Back to Login</span>
              </Link>
            </div>
            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label
                    htmlFor="businessName"
                    className="block mb-1 ml-4 font-serif font-bold text-sm"
                  >
                    BUSINESS NAME
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Business Name"
                    id="businessName"
                    {...register("companyName")}
                  />
                  {errors.companyName && (
                    <p className="text-red-500">{errors.companyName.message}</p>
                  )}
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
                  <label
                    htmlFor="ownerName"
                    className="block mb-1 ml-4 font-serif font-bold text-sm"
                  >
                    OWNER NAME
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Owner Name"
                    id="ownerName"
                  />
                  {/* {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>} */}
                </div>
                <div className="">
                  <label
                    htmlFor="designation"
                    className="block mb-1 ml-4 font-serif font-bold text-sm"
                  >
                    DESIGNATION
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    {...register('designation')}
                  >
                    <option value="">{userKycDetail?.Table?.[0]?.Designation || "Select a Designation"}</option>
                    {designationOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.designation && (
                    <p className="text-red-500">{errors.designation.message}</p>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block mb-1 ml-4 font-bold font-serif text-sm"
                >
                  ADDRESS LINE 1<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="House No./Flat No./Apartment"
                  id="address1"
                  {...register("address1")}
                />
                {errors.address1 && (
                  <p className="text-red-500">{errors.address1.message}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block mb-1 ml-4 font-bold font-serif text-sm"
                >
                  ADDRESS LINE 2
                </label>
                <input
                  type="text"
                  className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Society/Street/Area"
                  id="address2"
                  {...register("address2")}
                />
                {errors.address2 && (
                  <p className="text-red-500">{errors.address2.message}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="">
                  <label
                    htmlFor="country"
                    className="block mb-1 ml-4 font-bold font-serif text-sm"
                  >
                    COUNTRY
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    {...register("countryId")}
                  >
                    <option disabled>
                      {userKycDetail?.Table?.[0]?.Country || "Select a Country"}
                    </option>
                    {data?.Table?.map((item: any) => (
                      <option key={item?.SEQ_NO} value={item?.ISD_CODE}>
                        {item?.NAME}
                      </option>
                    ))}
                  </select>
                  {errors.countryId && (
                    <p className="text-red-500">{errors.countryId.message}</p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="zipCode"
                    className="block mb-1 ml-4 font-bold font-serif text-sm"
                  >
                    ZIP CODE
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Zip Code"
                    id="zipCode"
                    {...register("pincode")}
                  />
                  {errors.pincode && (
                    <p className="text-red-500">{errors.pincode.message}</p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="city"
                    className="block mb-1 ml-4 font-bold font-serif text-sm"
                  >
                    CITY
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your City name"
                    id="city"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-red-500">{errors.city.message}</p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="state"
                    className="block mb-1 ml-4 font-bold font-serif text-sm"
                  >
                    State
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your State name"
                    id="state"
                    {...register("state")}
                  />
                  {errors.state && (
                    <p className="text-red-500">{errors.state.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label
                    htmlFor="businessMobileNo"
                    className="block mb-1 font-serif ml-4 font-bold text-sm"
                  >
                    MOBILE NO.
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
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.businessMobileNo && (
                    <p className="text-red-500">
                      {errors.businessMobileNo.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="whatsappNo."
                    className="block mb-1 font-serif ml-4 font-bold text-sm"
                  >
                    WHATSAPP NO.
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
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.whatsappNo && (
                    <p className="text-red-500">{errors.whatsappNo.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label
                    htmlFor="co-email"
                    className="block mb-1 font-serif ml-4 font-bold text-sm"
                  >
                    COMPANY EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company's Email Id"
                    id="companyEMailId"
                    {...register("companyEMailId")}
                  />
                  {errors.companyEMailId && (
                    <p className="text-red-500">
                      {errors.companyEMailId.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="website"
                    className="block mb-1 ml-4 font-serif font-bold text-sm"
                  >
                    WEBSITE
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Website URL"
                    id="website"
                    {...register("website")}
                  />
                  {errors.website && (
                    <p className="text-red-500">{errors.website.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label
                    htmlFor="tax"
                    className="block mb-1 ml-4 font-serif font-bold text-sm"
                  >
                    TAX ID/ GST/ INCO-OPERATION NO.
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="TAX ID/ GST/ INCO-OPERATION NO."
                    id="tax"
                    {...register("gstNo")}
                  />
                  {errors.gstNo && (
                    <p className="text-red-500">{errors.gstNo.message}</p>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="businessType"
                    className="block mb-1 font-serif ml-4 font-bold text-sm"
                  >
                    BUSINESS TYPE
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    {...register("businesstypeId")}
                  >
                    <option disabled>
                      {userKycDetail?.Table?.[0]?.BusinessType || "Select a Business Type"}
                    </option>
                    {kyc?.Table?.map((item: any) => {
                      return (
                        <option key={item?.KYCTypeID} value={item?.KYCTypeID}>
                          {item?.KYCTypeDesc}
                        </option>
                      );
                    })}
                  </select>
                  {errors.businesstypeId && (
                    <p className="text-red-500">
                      {errors.businesstypeId.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 ml-2 font-bold text-sm font-serif">
                  TRADE REFERENCE 1<span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fRefCompanyName")}
                    />
                    {errors.fRefCompanyName && (
                      <p className="text-red-500">
                        {errors.fRefCompanyName.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Person
                    </label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fRefContactPerson")}
                    />
                    {errors.fRefContactPerson && (
                      <p className="text-red-500">
                        {errors.fRefContactPerson.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fRefContactNumber")}
                    />
                    {errors.fRefContactNumber && (
                      <p className="text-red-500">
                        {errors.fRefContactNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fRefEmailAddress")}
                    />
                    {errors.fRefEmailAddress && (
                      <p className="text-red-500">
                        {errors.fRefEmailAddress.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Edit
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefEdit')}
                    />
                    {errors.fRefEdit && <p className="text-red-500">{errors.fRefEdit.message}</p>} 
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Limit
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefLimit')}
                    />
                    {errors.fRefLimit && <p className="text-red-500">{errors.fRefLimit.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Address
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefAddress')}
                    />
                    {errors.fRefAddress && <p className="text-red-500">{errors.fRefAddress.message}</p>}
                  </div>
                </div>
                <label className="block font-serif font-bold text-sm ml-2 mb-2">
                  TRADE REFERENCE 2 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("sRefCompanyName")}
                    />
                    {errors.sRefCompanyName && (
                      <p className="text-red-500">
                        {errors.sRefCompanyName.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Person
                    </label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("sRefContactPerson")}
                    />
                    {errors.sRefContactPerson && (
                      <p className="text-red-500">
                        {errors.sRefContactPerson.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("sRefContactNumber")}
                    />
                    {errors.sRefContactNumber && (
                      <p className="text-red-500">
                        {errors.sRefContactNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("sRefEmailAddress")}
                    />
                    {errors.sRefEmailAddress && (
                      <p className="text-red-500">
                        {errors.sRefEmailAddress.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Edit
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefEdit')}
                    />
                    {errors.sRefEdit && <p className="text-red-500">{errors.sRefEdit.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Limit
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefLimit')}
                    />
                    {errors.sRefLimit && <p className="text-red-500">{errors.sRefLimit.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Address
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefAddress')}
                    />
                    {errors.sRefAddress && <p className="text-red-500">{errors.sRefAddress.message}</p>}
                  </div>
                </div>
                <label className="block font-serif font-bold text-sm ml-2 mb-2">
                  TRADE REFERENCE 3 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("tRefCompanyName")}
                    />
                    {errors.tRefCompanyName && (
                      <p className="text-red-500">
                        {errors.tRefCompanyName.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Person
                    </label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("tRefContactPerson")}
                    />
                    {errors.tRefContactPerson && (
                      <p className="text-red-500">
                        {errors.tRefContactPerson.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("tRefContactNumber")}
                    />
                    {errors.tRefContactNumber && (
                      <p className="text-red-500">
                        {errors.tRefContactNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("tRefEmailAddress")}
                    />
                    {errors.tRefEmailAddress && (
                      <p className="text-red-500">
                        {errors.tRefEmailAddress.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Edit
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefEdit')}
                    />
                    {errors.tRefEdit && <p className="text-red-500">{errors.tRefEdit.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Limit
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefLimit')}
                    />
                    {errors.tRefLimit && <p className="text-red-500">{errors.tRefLimit.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Address
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefAddress')}
                    />
                    {errors.tRefAddress && <p className="text-red-500">{errors.tRefAddress.message}</p>}
                  </div>
                </div>
                <label className="block font-bold font-serif text-sm ml-2 mb-2">
                  TRADE REFERENCE 4
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fouRefCompanyName")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fouRefContactPerson")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fouRefContactNumber")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fouRefEmailAddress")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Edit
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefEdit')}
                    />
                    {errors.fouRefEdit && <p className="text-red-500">{errors.fouRefEdit.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Limit
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefLimit')}
                    />
                    {errors.fouRefLimit && <p className="text-red-500">{errors.fouRefLimit.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Address
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefAddress')}
                    />
                    {errors.fouRefAddress && <p className="text-red-500">{errors.fouRefAddress.message}</p>}
                  </div>
                </div>
                <label className="block font-bold font-serif text-sm ml-2 mb-2">
                  TRADE REFERENCE 5
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fifRefCompanyName")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fifRefContactPerson")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fifRefContactNumber")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("fifRefEmailAddress")}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="mb-3">
                  <label className="block font-bold font-serif text-sm ml-4">
                    Edit
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('fifRefEdit')}
                  />
                  {errors.fifRefEdit && <p className="text-red-500">{errors.fifRefEdit.message}</p>}
                </div>
                <div className="mb-3">
                  <label className="block font-bold font-serif text-sm ml-4">
                    Limit
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('fifRefLimit')}
                  />
                  {errors.fifRefLimit && <p className="text-red-500">{errors.fifRefLimit.message}</p>}
                </div>
                <div className="mb-3">
                  <label className="block font-bold font-serif text-sm ml-4">
                    Address
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('fifRefAddress')}
                  />
                  {errors.fifRefAddress && <p className="text-red-500">{errors.fifRefAddress.message}</p>}
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-40 h-10 bg-blue-600 text-white font-serif rounded-3xl font-bold"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default KycApprovalDetail;
