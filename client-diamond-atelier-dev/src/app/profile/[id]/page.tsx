"use client";
import EditProfileInput from "@/components/Profile/EditProfileInput";
import { RootState } from "@/redux/combineReducer";
import { getUserDetailApi } from "@/redux/getUserDetail/getUserDetails";
import { useAppDispatch, useAppSelector } from "@/redux/ReduxHook";
import { getAllCountryApi } from "@/redux/SignUp/getAllCountryReducer";
import { signUpApi } from "@/redux/SignUp/signUpReducer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
export const runtime = 'edge';

type Item = {
  id: string;
  placeholder: string;
  value: string;
  fieldName: string;
  title: string;
  disabled?: boolean;
};

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  countryId: z.string().transform((val) => (val ? parseInt(val, 10) : null)),
  businessMobileNo: z.string(),
  password: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  whatsappNo: z.string(),
  address1: z.string(),
  address2: z.string(),
  companyName: z.string()
});


function Page() {
  const { data, error, isLoading } = useAppSelector(
    (state: RootState) => state.getAllCountryReducer
  );

  const { data: userDetail } = useAppSelector(
    (state: RootState) => state.getUserDetailReducer
  );

  const dispatch = useAppDispatch();
  const { back } = useRouter();

  const editProfile: Item[] = [
    {
      id: "firstname",
      placeholder: "Edit firstname",
      value: "",
      fieldName: "firstName",
      title: "FirstName",
    },
    {
      id: "lastname",
      placeholder: "Edit lastname",
      value: "",
      fieldName: "lastName",
      title: "Lastname",
    },
    {
      id: "CompanyName",
      placeholder: "Edit company name",
      value: "",
      fieldName: "companyName",
      title: "Company Name",
    },
    {
      id: "address1",
      placeholder: "Edit Address 1",
      value: "",
      fieldName: "address1",
      title: "Address 1",
    },
    {
      id: "address2",
      placeholder: "Edit Address 2",
      value: "",
      fieldName: "address2",
      title: "Address 2",
    },
    {
      id: "city",
      placeholder: "Edit city",
      value: "",
      fieldName: "city",
      title: "City",
    },
    {
      id: "state",
      placeholder: "Edit state",
      value: "",
      fieldName: "state",
      title: "State",
    },
    {
      id: "mobile",
      placeholder: "Edit MobileNo.",
      value: "",
      fieldName: "businessMobileNo",
      title: "Mobile No.",
    },
    {
      id: "zip",
      placeholder: "Edit zip code",
      value: "",
      fieldName: "pincode",
      title: "Zip Code",
    },
    {
      id: "whatsappNo",
      placeholder: "Edit Whatsapp No",
      value: "",
      fieldName: "whatsappNo",
      title: "Whatsapp No",
    },
    {
      id: "password",
      placeholder: "Edit password",
      value: "",
      fieldName: "password",
      title: "Password",
    }
  ];

  const methods: any = useForm({
    resolver: zodResolver(schema),
    values: {
      firstName: userDetail?.Table?.[0]?.firstName,
      lastName: userDetail?.Table?.[0]?.LastName,
      countryId: userDetail?.Table?.[0]?.Country,
      businessMobileNo: userDetail?.Table?.[0]?.BusinessMobileNo,
      password: userDetail?.Table?.[0]?.Password,
      emailid: userDetail?.Table?.[0]?.Emailid,
      city: userDetail?.Table?.[0]?.City,
      state: userDetail?.Table?.[0]?.State,
      pincode: userDetail?.Table?.[0]?.Pincode,
      whatsappNo: userDetail?.Table?.[0]?.WhatsappNo,
      address1: userDetail?.Table?.[0]?.Address1,
      address2: userDetail?.Table?.[0]?.Address2,
      companyName: userDetail?.Table?.[0]?.CompanyName,
    },
  });

  const onSubmit = (data: any) => {
    dispatch(
      signUpApi({
        ...data,
        Flag: "U",
        wpartycode: localStorage.getItem("wPartyCode"),
      })
    ).then(() => {
      dispatch(
        getUserDetailApi({
          username: localStorage.getItem("username") || "",
          emailid: "",
          partyrole: localStorage.getItem("partyrole") || "",
          companyName: "",
          mobileno : ""
        })
      );
    });
    toast.success("User Profile Updated Successfully");
  };

  useEffect(() => {
    dispatch(getAllCountryApi());
    dispatch(
      getUserDetailApi({
        username: localStorage.getItem("username") || "",
        emailid: "",
        partyrole: localStorage.getItem("partyrole") || "",
        companyName: "",
        mobileno : ""
      })
    );
  }, [dispatch]);

  return (
    <div>
      <div className="text-2xl text-center py-3">Edit Profile</div>
      <hr />
      <div className="">
        <div className="relative w-full border h-[110px] bg-custom-gradient flex items-center flex-col rounded-b-xl">
          <div className="absolute text-center translate-y-1/3">
            <img
              height={"100%"}
              width={"100%"}
              className=" rounded-full border border-blue-900 h-[100px] w-[100px] object-center"
              src={
                "https://cdn.pixabay.com/photo/2023/08/05/08/15/ship-8170663_640.jpg"
              }
              alt="logo"
            />
            <div className="font-bold text-lg">{userDetail?.Table?.[0]?.UserName}</div>
          </div>
        </div>
        <div className="mt-20">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex items-center flex-col"
            >
              <div className="grid grid-cols-2 w-[50%] gap-4">
                {editProfile.map((item: Item, index) => (
                  <EditProfileInput
                    id={item.id}
                    disabled={item.disabled}
                    key={item.id}
                    title={item.title}
                    placeholder={item.placeholder}
                    value={item.id}
                    fieldName={item.fieldName}
                    customClass="w-1/2 border border-gray rounded-3xl px-8 py-2"
                  />
                ))}
                <div className="">
                  <label
                    htmlFor="country"
                    className="block  font-bold text-lg"
                  >
                    Country
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="rounded-3xl w-full h-10 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default select example"
                    {...methods.register("countryId")}
                  >
                    <option disabled>{userDetail?.Table?.[0]?.Country}</option>
                    {data?.Table?.map((item: any) => {
                      return (
                        <option key={item.ISD_CODE} value={item.SEQ_NO}>
                          {item.NAME}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="mt-6 space-x-4 mb-2">
                <button type="button" onClick={() => back()} className="rounded-xl text-lg px-4 py-2 bg-blue-600 text-white">
                  Back
                </button>
                <button
                  type="submit"
                  className="rounded-xl text-lg px-4 py-2 bg-blue-600 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default Page;
