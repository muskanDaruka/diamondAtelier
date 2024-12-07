"use client";
import ExoticShapeFilters from "@/components/PageComponents/Exotic-Shapes/ExoticShapeFilters";
import ExoticShapeHeader from "@/components/PageComponents/Exotic-Shapes/ExoticShapeHeader";
import { Suspense, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ValidationSchemaType, schema } from "@/schemas/exotic-shapes/formData.types";
import DataFormateExotic from "@/helpers/ApiDataExotic";
import { useAppDispatch } from "@/redux/ReduxHook";
import { resetState } from "@/redux/ExoticShapes/exoticShapesReducer";
import { boolean } from "zod";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const PageComponent = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const defaultValues: ValidationSchemaType = {
    commenT_TYPE: "EXOTIC SHAPES",
    stock:searchParams.getAll("stock"),
    pageno: Number(searchParams.get("pageno")) || 0,
    f_WGT: Number(searchParams.get("f_WGT")) || "",
    t_WGT: Number(searchParams.get("t_WGT")) || "",
    f_LENGTH:searchParams.get("f_LENGTH")||"",
    t_LENGTH:searchParams.get("t_LENGTH") || '',
    f_WIDTH: searchParams.get("f_WIDTH") || '',
    t_WIDTH: searchParams.get("t_WIDTH") || '',
    shape: searchParams.getAll("shape"),
    froM_WGT: searchParams.get("froM_WGT") || "",
    tO_WGT: searchParams.get("tO_WGT") || "",
    grown: searchParams.getAll("grown"),
    colgrp: searchParams.getAll("colgrp"),
    packeT_NO: searchParams.get("packeT_NO") || "",
    f_RATIO: searchParams.get("f_RATIO") || "",
    t_RATIO: searchParams.get("t_RATIO") || "",
    f_DEPTH: searchParams.get("f_DEPTH") || "",
    t_DEPTH: searchParams.get("t_DEPTH") || "",
    f_RATE: searchParams.get("f_RATE") ?? "",
    t_RATE: searchParams.get("t_RATE") ?? "",
    f_VALUE: searchParams.get("f_VALUE") ?? "",
    t_VALUE: searchParams.get("t_VALUE") ?? "",
    location: searchParams.getAll("location"),
    cut: searchParams.getAll("cut"), 
    priceType: searchParams.get("priceType") || "1",
    IS_MATCHING_PAIR:  searchParams.get('IS_MATCHING_PAIR') || "SINGLE"
  };

  const methods: any = useForm<ValidationSchemaType>({ defaultValues, resolver: zodResolver(schema) });

  const watchField: ValidationSchemaType = methods.watch();

  const onSubmit = (data: ValidationSchemaType) => {
    DataFormateExotic(data)
    dispatch(resetState());
    localStorage.setItem("filters", JSON.stringify(data || {}));
    localStorage.removeItem("columnOrder");
    router.push("/exoticResult")
  }

  const updateQueryParameter = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(watchField)
      .filter(([key, value]: any) => !(value == 0 || value == ""))
      .forEach(([key, value]: any) => {
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
    <FormProvider {...methods}>
      <div className="space-y-5">
        <ExoticShapeHeader />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ExoticShapeFilters />
        </form>
      </div>
    </FormProvider>
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
