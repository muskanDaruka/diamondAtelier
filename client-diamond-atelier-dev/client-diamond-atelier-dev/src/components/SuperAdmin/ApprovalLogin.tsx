"use client";
import React, { useEffect } from "react";
import Style from "@/Style/Auth.module.css";
import { useSelector } from "react-redux";
import { getKycMasterApi } from "@/redux/SignUp/getKycMasterReducer";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { signUpApi } from "@/redux/SignUp/signUpReducer"
import { getAllCountryApi } from "@/redux/SignUp/getAllCountryReducer";
import { RootState } from "@/redux/combineReducer";
import { useAppDispatch } from "@/redux/ReduxHook";
import { useRouter } from "next/navigation";
import 'react-phone-number-input/style.css'
import { getApprovedUserApi } from "@/redux/approvalLogin/saveUserApproval";

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
  iS_WHOLESALER: string;
  iS_JEWELLER: string;
  iS_INDIVIDUAL: string;
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
  flag: string;
  wPartyCode: string | null;
  partyrole: string;
}

const schema = z.object({
  designation: z.string(),
  whatsappNo: z.string(),
  companyName: z.string(),
  address1: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  countryId: z.string().transform((val) => (val ? parseInt(val, 10) : null)),
  businesstypeId: z.string().transform((val) => (val ? parseInt(val, 10) : null)),
  businessMobileNo: z.string(),
  gstNo: z.string(),
  fRefCompanyName: z.string(),
  fRefContactPerson: z.string(),
  fRefContactNumber: z.string(),
  fRefEmailAddress: z.string(),
  sRefCompanyName: z.string(),
  sRefContactPerson: z.string(),
  sRefContactNumber: z.string(),
  tRefCompanyName: z.string(),
  tRefContactPerson: z.string(),
  tRefContactNumber: z.string(),
  tRefEmailAddress: z.string(),
  isDiamondMfg: z.boolean(),
  isWholeseller: z.boolean(),
  isJeweller: z.boolean(),
  isIndividual: z.boolean(),
  iS_MANUFACTURE: z.string(),
  iS_WHOLESALER: z.string(),
  iS_JEWELLER: z.string(),
  iS_INDIVIDUAL: z.string(),
  fRefEdit: z.string(),
  fRefLimit: z.string(),
  fRefAddress: z.string(),
  sRefEdit: z.string(),
  sRefLimit: z.string(),
  sRefAddress: z.string(),
  tRefEdit: z.string(),
  tRefLimit: z.string(),
  tRefAddress: z.string(),
})

const defaultValues = {
  "wPartyCode": "0",
  "designation": "",
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
  "fRefEdit": "",
  "fRefLimit": "",
  "fRefAddress": "",
  "sRefEdit": "",
  "sRefLimit": "",
  "sRefAddress": "",
  "tRefEdit": "",
  "tRefLimit": "",
  "tRefAddress": "",
  "fouRefEdit": "",
  "fouRefLimit": "",
  "fouRefAddress": "",
  "fifRefEdit": "",
  "fifRefLimit": "",
  "fifRefAddress": "",
  "iS_MANUFACTURE": "",
  "iS_WHOLESALER": "",
  "iS_JEWELLER": "",
  "iS_INDIVIDUAL": "",
  "userCode": "",
  "orgtypeId": "",
  "createdby": "",
  "modifyby": "",
  "partyrole": "",
  "flag": "",
}

const LoginApproval = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useSelector(
    (state: RootState) => state.getAllCountryReducer
  );
  const { data: userDetail } = useSelector(
    (state: RootState) => state.getUserDetailReducer
  );
  const { data: kyc } = useSelector((state: RootState) => state.getKycMasterReducer);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFields>({ resolver: zodResolver(schema), defaultValues });

  useEffect(() => {
    dispatch(getAllCountryApi());
    dispatch(getKycMasterApi());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(signUpApi({
      ...data,
      wPartyCode: localStorage.getItem("wPartyCode"),
    }))
  },[])

  const onSubmit = () => {
    dispatch(
      getApprovedUserApi({
        userName: localStorage.getItem("UserName") || "",
        isUserApproval: false,
        modifyby: "",
      })
    )
  }

  return (
    <section className={`${Style.signUpBackground} mx-full w-full`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-10 flex justify-center items-center pt-5 p-64 pb-5">
          <div className="">
            <div className="flex justify-evenly items-center mb-6">
              <h1 className="font-bold font-serif text-3xl text-center">User Business</h1>
              {/* <Link href="/">
                <span className="text-blue-600 font-serif">Back to Login</span>
              </Link> */}
            </div>
            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label htmlFor="businessName" className="block mb-1 ml-4 font-serif font-bold text-sm">BUSINESS NAME
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    disabled={true}
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Business Name"
                    id="businessName"
                    {...register("companyName")}
                    value={userDetail?.Table?.[0]?.CompanyName}
                  />
                </div>
                <div className="">
                  <div className="flex">
                    <div className="mt-4">
                      <input type="checkbox" disabled={true} id="individual" value={userDetail?.Table?.[0]?.IS_INDIVIDUAL} onClick={(e: any) => e.target.checked ? setValue('iS_INDIVIDUAL', 'Y') : setValue('iS_INDIVIDUAL', 'N')} />
                      <label htmlFor="individual" className="ml-2 font-bold font-serif text-sm">GROWER</label>
                    </div>
                    <div className="mt-4 ml-2">
                      <input type="checkbox" disabled={true} id="diamondManufacturer" value={userDetail?.Table?.[0]?.IS_MANUFACTURE} onClick={(e: any) => e.target.checked ? setValue('iS_MANUFACTURE', 'Y') : setValue('iS_MANUFACTURE', 'N')} />
                      <label htmlFor="diamondManufacturer" className="ml-2 font-bold font-serif text-sm">MANUFACTURER</label>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mb-3">
                      <input type="checkbox" disabled={true} id="jeweller" onClick={(e: any) => e.target.checked ? setValue('iS_JEWELLER', 'Y') : setValue('iS_JEWELLER', 'N')} value={userDetail?.Table?.[0]?.IS_JEWELLER} />
                      <label htmlFor="jeweller" className="ml-2 font-bold font-serif text-sm">JEWELLER</label>
                    </div>
                    <div className="mb-3 ml-2">
                      <input type="checkbox" disabled={true} id="wholesaler" onClick={(e: any) => e.target.checked ? setValue('iS_WHOLESALER', 'Y') : setValue('iS_WHOLESALER', 'N')} value={userDetail?.Table?.[0]?.IS_WHOLESALER} />
                      <label htmlFor="wholesaler" className="ml-2 font-bold font-serif text-sm">WHOLESALER</label>
                    </div>
                  </div>
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
                    disabled={true}
                    id="ownerName"
                    {...register('firstName')}
                    value={userDetail?.Table?.[0]?.firstName}
                  />
                </div>
                <div className="">
                  <label htmlFor="designation" className="block mb-1 ml-4 font-serif font-bold text-sm">DESIGNATION
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Designation"
                    id="designation"
                    disabled={true}
                    {...register('designation')}
                    value={userDetail?.Table?.[0]?.Designation}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block mb-1 ml-4 font-bold font-serif text-sm">ADDRESS LINE 1
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="House No./Flat No./Apartment"
                  id="address1"
                  disabled={true}
                  {...register('address1')}
                  value={userDetail?.Table?.[0]?.Address1}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block mb-1 ml-4 font-bold font-serif text-sm">ADDRESS LINE 2
                </label>
                <input
                  type="text"
                  className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Society/Street/Area"
                  id="address2"
                  disabled={true}
                  {...register('address2')}
                  value={userDetail?.Table?.[0]?.Address2}
                />
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
                    disabled={true}
                  >
                    <option value="">{userDetail?.Table?.[0]?.Country}</option>
                    {data?.Table?.map((item: any) => (
                      <option key={item?.SEQ_NO} value={item?.ISD_CODE}>{item?.NAME}</option>
                    ))}
                  </select>
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
                    disabled={true}
                    {...register('pincode')}
                    value={userDetail?.Table?.[0]?.Pincode}
                  />
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
                    disabled={true}
                    {...register('city')}
                    value={userDetail?.Table?.[0]?.City}
                  />
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
                    disabled={true}
                    {...register('state')}
                    value={userDetail?.Table?.[0]?.State}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <div className="">
                  <label htmlFor="businessMobileNo" className="block mb-1 font-serif ml-4 font-bold text-sm">MOBILE NO.
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Edit Mobile no."
                    id="businessMobileNo"
                    disabled={true}
                    {...register('businessMobileNo')}
                    value={userDetail?.Table?.[0]?.BusinessMobileNo}
                  />
                </div>
                <div className="">
                  <label htmlFor="whatsappNo." className="block mb-1 font-serif ml-4 font-bold text-sm">WHATSAPP NO.
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Edit Mobile no."
                    id="whatsappNo."
                    disabled={true}
                    {...register('whatsappNo')}
                    value={userDetail?.Table?.[0]?.WhatsappNo}
                  />
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
                    disabled={true}
                    {...register('companyEMailId')}
                    value={userDetail?.Table?.[0]?.CompanyEMailId}
                  />
                </div>
                <div className="">
                  <label htmlFor="website" className="block mb-1 ml-4 font-serif font-bold text-sm">WEBSITE</label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Website URL"
                    id="website"
                    {...register('website')}
                    disabled={true}
                    value={userDetail?.Table?.[0]?.Website}
                  />
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
                    disabled={true}
                    value={userDetail?.Table?.[0]?.GSTNo}
                  />
                </div>
                <div className="">
                  <label htmlFor="businessType" className="block mb-1 font-serif ml-4 font-bold text-sm">BUSINESS TYPE
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    disabled={true}
                    {...register("businesstypeId")}
                  >
                    <option value="">{userDetail?.Table?.[0]?.BusinessType}</option>
                    {kyc?.Table?.map((item: any) => {
                      return (
                        <option key={item?.KYCTypeID} value={item?.KYCTypeID}>
                          {item?.KYCTypeDesc}
                        </option>
                      );
                    })}
                  </select>
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
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FRefCompanyName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefContactPerson')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FRefContactPerson}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefContactNumber')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FRefContactNumber}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefEmailAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FRefEmailAddress}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Edit</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefEdit')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FRefEdit}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Limit</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefLimit')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FRefLimit}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Address</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fRefAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FRefAddress}
                    />
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
                      disabled={true}
                      value={userDetail?.Table?.[0]?.SRefCompanyName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefContactPerson')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.SRefContactPerson}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefContactNumber')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.SRefContactNumber}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefEmailAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.SRefEmailAddress}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Edit</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefEdit')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.SRefEdit}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Limit</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefLimit')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.SRefLimit}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Address</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('sRefAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.SRefAddress}
                    />
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
                      disabled={true}
                      value={userDetail?.Table?.[0]?.TRefCompanyName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefContactPerson')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.TRefContactPerson}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefContactNumber')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.TRefContactNumber}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefEmailAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.TRefEmailAddress}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Edit</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefEdit')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.TRefEdit}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Limit</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefLimit')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.TRefLimit}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Address</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('tRefAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.TRefAddress}
                    />
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
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FouRefCompanyName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefContactPerson')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FouRefContactPerson}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefContactNumber')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FouRefContactNumber}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefEmailAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FouRefEmailAddress}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Edit</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefEdit')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FouRefEdit}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Limit</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefLimit')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FouRefLimit}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Address</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fouRefAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FouRefAddress}
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
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FifRefCompanyName}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Person</label>
                    <input
                      type="text"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fifRefContactPerson')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FifRefContactPerson}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Contact Number</label>
                    <input
                      type="tel"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fifRefContactNumber')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FifRefContactNumber}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block font-bold font-serif text-sm ml-4">Email Address</label>
                    <input
                      type="email"
                      className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('fifRefEmailAddress')}
                      disabled={true}
                      value={userDetail?.Table?.[0]?.FifRefEmailAddress}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="mb-3">
                  <label className="block font-bold font-serif text-sm ml-4">Edit</label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('fifRefEdit')}
                    disabled={true}
                    value={userDetail?.Table?.[0]?.FifRefEdit}
                  />
                </div>
                <div className="mb-3">
                  <label className="block font-bold font-serif text-sm ml-4">Limit</label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('fifRefLimit')}
                    disabled={true}
                    value={userDetail?.Table?.[0]?.FifRefLimit}
                  />
                </div>
                <div className="mb-3">
                  <label className="block font-bold font-serif text-sm ml-4">Address</label>
                  <input
                    type="text"
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('fifRefAddress')}
                    disabled={true}
                    value={userDetail?.Table?.[0]?.FifRefAddress}
                  />
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
    </section >
  );
}

export default LoginApproval;
