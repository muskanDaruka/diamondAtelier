"use client"
import { buyerColumn } from "./Buyer";
import { sellerColumn } from "./Seller";
import { sellerAdminColumn } from "./SellerAdmin";
import { superAdminColumn } from "./SuperAdminColumn";


type Fields = {
    STOCK?: string;
    PREFIX?: string;
    PACKET_NO?: string;
    DESCRIPTION?: string;
    STONE_STAGE?: string;
    SHAPE?: string;
    LENGTH?:string;
    WIDTH?:string;
    Width1?:string;
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
    NET_RATE?: number;
    NET_VALUE?: number;
    RATIO?: number;
    MEASUREMENT?: string;
    MM_N?: string;
    ICOLOR?:string;
    TABLE_PER?: number;
    DEPTH_PER?: number;
    CUT?: string;
    POLISH?: string;
    SYMM?: string;
    REPORT_NO?: string;
    Location?: string;
    SUPPLIER_NAME?:string;
    INW_DATE?:string;
    NAME?:string;
    MEMO_DATE?:string;
    MEMO_NO?:string;
    SELLER_NAME?:string;
    COST_DISC_PER?:string;
    COST_RATE?:string;
    SIZE_N:string;
    COST_VALUE?:string;
    No_of_stock_per_carat?: number;
    no_of_piece?: string;
    MEDIUM_RATE?:string;
    RETAIL_RATE?:string;
    MEDIUM_VALUE?:string;
    RETAIL_VALUE?:string;
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


const removeCertifiedItem = ['SIZE_N','MEDIUM_RATE','RETAIL_RATE','MEDIUM_VALUE','RETAIL_VALUE','Size_CENT','HEIGHT','DESCRIPTION','MM_N','memo_dtl','CENT','CARAT','P_Ct','piece_per_carat','OIC','Approx_Amount','approx_weight',"ICOLOR",'STOCK','Width1','LENGTH','WIDTH','TOT_WGT','No_of_stock_per_carat','no_of_piece','wholesale_price','medium_price','retail_price'];
const removeCs_ColorItem = ['RATE','SIZE_N','Size_CENT','HEIGHT','DESCRIPTION','MM_N','memo_dtl','CENT','CARAT','P_Ct','piece_per_carat','OIC','Approx_Amount','approx_weight','STOCK','LENGTH','Width1','WIDTH','TOT_WGT','No_of_stock_per_carat','no_of_piece','wholesale_price','medium_price','retail_price',"PRICE_RATE"];

function columnVisibility(columns: any[]) {
    switch (window.location.pathname) {
        case "/certifiedResult": 
            return columns.filter((column: any) => !removeCertifiedItem.includes(column.id));
            case "/color-result/cs-colorResult": 
            return columns.filter((column: any) => !removeCs_ColorItem.includes(column.id));
            default:
            return columns;
    }

}



export function Column(): any{
   
    if(userType == "BUYER"){
        return columnVisibility(buyerColumn);
    }
    if(userType == "SELLER"){
        return columnVisibility(sellerColumn);
    }
    if(userType == "SELLERADMIN"){
        return columnVisibility(sellerAdminColumn);
    }
    if(userType == "SUPERADMIN"){
        return columnVisibility(superAdminColumn);
    }
    return [];
}