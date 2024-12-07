"use client"
import NonCertifiedFilter from "@/components/PageComponents/Non-Certified/nonCertifiedFilter";
import NonCertifiedHeader from "@/components/PageComponents/Non-Certified/nonCertifiedHeader";
import { FormProvider, useForm } from "react-hook-form";
import DataFormateNonCerti from "@/helpers/ApiDataNonCerti";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schema,
  ValidationSchemaType,
} from "@/schemas/non-certified/formData.types";
import { resetState } from "@/redux/NonCertified/nonCertifiedReducer";
import { useAppDispatch } from "@/redux/ReduxHook";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function PageComponent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
const dispatch = useAppDispatch();

  const defaultValues: ValidationSchemaType = {
    commenT_TYPE: "NON CERTIFIED",
    stock: searchParams.getAll("stock"),
    colgrp: searchParams.getAll("colgrp"),
    purgrp: searchParams.getAll("purgrp"),
    packeT_NO: searchParams.get("packeT_NO") || "",
    f_WGT: searchParams.get("f_WGT") || "",
    t_WGT: searchParams.get("t_WGT") || "",
    f_RATIO: searchParams.get("f_RATIO") || "",
    t_RATIO: searchParams.get("t_RATIO") || "",
    f_LENGTH: searchParams.get("f_LENGTH") || '',
    t_LENGTH: searchParams.get("t_LENGTH") || '',
    f_WIDTH: searchParams.get("f_WIDTH") || '',
    t_WIDTH: searchParams.get("t_WIDTH") || '',
    shape: searchParams.getAll("shape"),
    grown: searchParams.getAll("grown"),
    f_DEPTH: searchParams.get("f_DEPTH") || "",
    t_DEPTH: searchParams.get("t_DEPTH") || "",
    f_RATE: searchParams.get("f_RATE") ?? "",
    t_RATE: searchParams.get("t_RATE") ?? "",
    f_VALUE: searchParams.get("f_VALUE") ?? "",
    t_VALUE: searchParams.get("t_VALUE") ?? "",
    location: searchParams.getAll("location"),
    priceType: searchParams.get("priceType") || "1",
    pageno: Number(searchParams.get("pageno")) || 0,
  };

  const methods: any = useForm<ValidationSchemaType>({
    defaultValues,
    resolver: zodResolver(schema),
  });
  const watchField: ValidationSchemaType = methods.watch();

  const onSubmit = async (data: ValidationSchemaType) => {
    DataFormateNonCerti(data);
    dispatch(resetState())
    localStorage.setItem("filters", JSON.stringify(data || {}));
    localStorage.removeItem("columnOrder");
    push("/nonCertifiedResult");
  };

  const updateQueryParameter = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(watchField)
      .filter(([key, value]: [string, any]) => !(value == 0 || value == ""))
      .forEach(([key, value]: [string, any]) => {
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
    <>
      <FormProvider {...methods}>
        <div className="space-y-5">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <NonCertifiedHeader />
            <NonCertifiedFilter />
          </form>
        </div>
      </FormProvider>
    </>
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


