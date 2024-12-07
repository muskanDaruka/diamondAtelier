"use client"
import { buyerColumn } from "@/components/Columns/Exotic-Columns/Buyer";
import { sellerColumn } from "@/components/Columns/Exotic-Columns/Seller";
import { sellerAdminColumn } from "@/components/Columns/Exotic-Columns/SellerAdmin";
import { superAdminColumn } from "@/components/Columns/Exotic-Columns/SuperAdmin";


type Fields = {
    STOCK?: string;
    PREFIX?: string;
    PACKET_NO?: string;
    DESCRIPTION?: string;
    STONE_STAGE?: string;
    SHAPE?: string;
    LENGTH?:string;
    WIDTH?:string;
    WIDTH_1?:string;
    HEIGHT?:number;
    TOT_WGT?: number;
    SrNo?:number;
    WGT?: number;
    COLOR?: string;
    PURITY?: string;
    VIDEO_PATH?: string;
    LAB?: string;
    RATE?: number;
    DISC_PER?: number;
    SALERATE?: number;
    VALUE?: number;
    RATIO?: number;
    MEASUREMENT?: string;
    MM_N?: string;
    TABLE_PER?: number;
    DEPTH?: number;
    CUT?: string;
    POLISH?: string;
    SYMM?: string;
    REPORT_NO?: string;
    LOCATION?: string;
    SUPPLIER_NAME?:string;
    INW_DATE?:string;
    NAME?:string;
    MEMO_DATE?:string;
    MEMO_NO?:string;
    SELLER_NAME?:string;
    COST_DISC_PER?:string;
    COST_RATE?:string;
    SIZE_N?:string;
    COST_VALUE?:string;
    No_of_stock_per_carat?: number;
    no_of_piece?: string;
    wholesale_price?: string;
    medium_price?:string;
    retail_price?:string;
    PAGENO?: number | string;
    Approx_Amount?:string;
    approx_weight?:string;
    OIC?:string;
    piece_per_carat?:string;
    P_Ct?: string;
    CARAT?:string;
    CENT?:string;
    memo_dtl?:string
  };

let userType = "";

if (typeof window !== "undefined") {
  userType = localStorage.getItem("userType") || "";
}

export function Column(): any{
   
    if(userType == "BUYER"){
        return buyerColumn;
    }
    if(userType == "SELLER"){
        return sellerColumn;
    }
    if(userType == "SELLERADMIN"){
        return sellerAdminColumn;
    }
    if(userType == "SUPERADMIN"){
        return superAdminColumn;
    }
    return [];
}