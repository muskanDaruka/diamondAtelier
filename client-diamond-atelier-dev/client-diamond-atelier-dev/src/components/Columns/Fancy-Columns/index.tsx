"use client"
import { buyerColumn } from "@/components/Columns/Fancy-Columns/Buyer";
import { sellerColumn } from "@/components/Columns/Fancy-Columns/Seller";
import { sellerAdminColumn } from "@/components/Columns/Fancy-Columns/SellerAdmin";
import { superAdminColumn } from "@/components/Columns/Fancy-Columns/SuperAdmin";


type Fields = {
    STOCK?: string;
    PREFIX?: string;
    PACKET_NO?: string;
    DESCRIPTION?: string;
    STONE_STAGE?: string;
    SHAPE?: string;
    LENGTH?: string;
    WIDTH?: string;
    WIDTH_1?: string;
    HEIGHT?: number;
    TOT_WGT?: number;
    SrNo?: number;
    WGT?: number;
    COLOR?: string;
    FANCY_COLOR?:string;
    INTENSITY?:string;
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
    SUPPLIER_NAME?: string;
    INW_DATE?: string;
    NAME?: string;
    MEMO_DATE?: string;
    MEMO_NO?: string;
    SELLER_NAME?: string;
    COST_DISC_PER?: string;
    COST_RATE?: string;
    SIZE_N: string;
    COST_VALUE?: string;
    No_of_stock_per_carat?: number;
    no_of_piece?: string;
    wholesale_price?: string;
    medium_price?: string;
    retail_price?: string;
    PAGENO?: number | string;
    Approx_Amount?: string;
    approx_weight?: string;
    OIC?: string;
    piece_per_carat?: string;
    P_Ct?: string;
    CARAT?: string;
    CENT?: string;
    memo_dtl?: string;
    stock_dtl?: string;
};

let userType = "";

if (typeof window !== "undefined") {
    userType = localStorage.getItem("userType") || "";
}
const removeFancyItem = ['FANCY_COLOR','INTENSITY','LOCATION','MM_N']
const removeMeleeItem = ['FANCY_COLOR','INTENSITY','LOCATION','LENGTH','WIDTH']
const removeCsMeleeItem = ['COLOR',,'LENGTH','WIDTH']

function columnVisibility(columns: any[]) {
    switch (window.location.pathname) {
        case "/fancyResult":
            return columns.filter((column: any) => !removeFancyItem.includes(column.id));
        case "/meleeResult":
            return columns.filter((column: any) => !removeMeleeItem.includes(column.id));
        case '/color-result/cs-meleeResult':
            return columns.filter((column: any) => !removeCsMeleeItem.includes(column.id));
        default:
            return columns;
    }

}
export function Column(): any {

    if (userType == "BUYER") {
        return columnVisibility(buyerColumn);
    }
    if (userType == "SELLER") {
        return columnVisibility(sellerColumn);
    }
    if (userType == "SELLERADMIN") {
        return columnVisibility(sellerAdminColumn);
    }
    if (userType == "SUPERADMIN") {
        return columnVisibility(superAdminColumn);
    }
    return [];
}