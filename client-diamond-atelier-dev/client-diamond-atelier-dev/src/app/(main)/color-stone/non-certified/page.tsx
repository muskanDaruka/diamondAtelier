"use client"
import CsNoncertifiedFilter from "@/components/PageComponents/Color-Stone/cs-noncertifiedFilter";
import CSNonCertifiedStoneHeader from "@/components/PageComponents/Color-Stone/cs-noncertifiedHeader";
import { useAppDispatch } from "@/redux/ReduxHook";
import { schema, ValidationSchemaType } from "@/schemas/color-stone/cs-noncertified/formData.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {


  const { replace, push } = useRouter();
  const dispatch = useAppDispatch();
  const [userType, setUserType] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserType(localStorage.getItem("username") || "");
    }
  }, []);

  const defaultValues:ValidationSchemaType = {
    commenT_TYPE: "",
    shape: [],
    f_WGT: 0,
    t_WGT: 0,
    colgrp: [],
    purgrp: [],
    f_RATIO: 0,
    t_RATIO: 0,
    grown: [],
    stock: [],
    packeT_NO: "",
    location: [],
    f_RATE: 0,
    t_RATE: 0,
    f_VALUE: 0,
    t_VALUE: 0,
    f_LENGTH: "",
    t_LENGTH: "",
    f_WIDTH: "",
    t_WIDTH: "",
    f_DEPTH: 0,
    t_DEPTH: 0,
    intensity: [],
    pageno:0 
  }

  const methods = useForm<ValidationSchemaType>({defaultValues,resolver:zodResolver(schema)});


  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
      <CSNonCertifiedStoneHeader />
      <CsNoncertifiedFilter />
      </FormProvider>
    </div>
  );
};

export default Page;
