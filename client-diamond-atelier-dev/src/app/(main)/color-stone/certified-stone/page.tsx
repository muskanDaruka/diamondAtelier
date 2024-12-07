"use client"
import CsCertifiedStoneFilter from "@/components/PageComponents/Color-Stone/cs-certifiedStoneFilter";
import CertifiedStone from "@/components/PageComponents/Color-Stone/cs-certifiedStoneHeader";
import DataFormate from "@/helpers/ApiDataFormate";
import { resetState } from "@/redux/certifiedStone/getAllStone";
import { useAppDispatch } from "@/redux/ReduxHook";
import { schema, ValidationSchemaType } from "@/schemas/certified-stone/formData.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const PageComponent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const dispatch = useAppDispatch();

  const [userType, setUserType] = useState("");
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserType(localStorage.getItem("userType") || "");
    }
  }, []);
  
  const defaultValues: ValidationSchemaType = {
    deaL_INT_STAGE: searchParams.getAll("deaL_INT_STAGE"),
    shapE_SEQ: searchParams.getAll("shapE_SEQ"),
    laB_SEQ: searchParams.getAll("laB_SEQ"),
    coloR_SEQ: searchParams.getAll("coloR_SEQ"),
    puritY_SEQ: searchParams.getAll("puritY_SEQ"),
    polisH_SEQ: searchParams.getAll("polisH_SEQ"),
    cuT_SEQ: searchParams.getAll("cuT_SEQ"),
    symM_SEQ: searchParams.getAll("symM_SEQ"),
    reporT_NO: searchParams.get("reporT_NO") || "",
    PACKET_NO: searchParams.get("PACKET_NO") || "",
    PREFIX: searchParams.getAll("PREFIX"),
    froM_WGT: searchParams.get("froM_WGT") || "",
    tO_WGT: searchParams.get("tO_WGT") || "",
    ratiO_FROM: searchParams.get("ratiO_FROM") || "",
    ratiO_TO: searchParams.get("ratiO_TO") || "",
    tableP_FROM: searchParams.get("tableP_FROM") || "",
    tableP_TO: searchParams.get("tableP_TO") || "",
    depthP_FROM: searchParams.get("depthP_FROM") || "",
    depthP_TO: searchParams.get("depthP_TO") || "",
    lengtH_FROM: searchParams.get("lengtH_FROM") || "",
    lengtH_TO: searchParams.get("lengtH_TO") || "",
    widtH_FROM: searchParams.get("widtH_FROM") || "",
    widtH_TO: searchParams.get("widtH_TO") || "",
    deptH_FROM: searchParams.get("deptH_FROM") || "",
    deptH_TO: searchParams.get("deptH_TO") || "",
    PRATE_FROM: searchParams.get("PRATE_FROM") ?? "",
    PRATE_TO: searchParams.get("PRATE_TO") ?? "",
    PVALUE_FROM: searchParams.get("PVALUE_FROM") ?? "",
    PVALUE_To: searchParams.get("PVALUE_To") ?? "",
    PAGENO: searchParams.get("PAGENO") || "1",
    country: searchParams.getAll("country"),
    FDISC_PER:searchParams.get("FDISC_PER")||"",
    TDISC_PER:searchParams.get("TDISC_PER")||"",
    priceType: searchParams.get("priceType") || "1",
    icolor_desc:searchParams.getAll("icolor_desc")||"",
    coloR_DESC: "a",
    partyrole: userType
  };
  
  const methods = useForm<ValidationSchemaType>({defaultValues,resolver:zodResolver(schema)});
  const watchField:ValidationSchemaType = methods.watch();
  
  const onSubmit = (data:ValidationSchemaType)=>{
    DataFormate(data);
    data.partyrole = userType;
    localStorage.setItem("filters",JSON.stringify(data||{}));
    dispatch(resetState());
    localStorage.removeItem("columnOrder");
    push("/color-result/cs-colorResult");
  }

  const updateQueryParameter = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(watchField)
      .filter(([key, value]: [string,any]) => !(value == 0 || value == ""))
      .forEach(([key, value]: [string,any]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => params.append(key, val));
        } else {
          params.set(key, value);
        }
  });

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [watchField, pathname, replace]);

  useEffect(() => {
    updateQueryParameter();
  }, [watchField, updateQueryParameter]);

  return (
    <div className="space-y-5">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CertifiedStone />
        <CsCertifiedStoneFilter />
        </form>
      </FormProvider>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
};

export default Page;
