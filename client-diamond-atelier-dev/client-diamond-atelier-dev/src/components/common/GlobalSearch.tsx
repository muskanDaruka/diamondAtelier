"use client"
import { RootState } from '@/redux/combineReducer';
import { useAppDispatch, useAppSelector } from '@/redux/ReduxHook';
import { searchApi } from '@/redux/search/searchReducer';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function GlobalSearch() {
    const { data, isLoading } = useAppSelector(
        (store: RootState) => store?.searchReducer
    );


    const [searchValue, setSearchValue] = useState<string>("");
    const dispatch = useAppDispatch();
    const router = useRouter();

    const RedirectRoute = (expression: string, value: string) => {
        switch (expression) {
            case "CERTIFIED":
                router.push("/certifiedResult");
                const filters = {
                    "deaL_INT_STAGE": "",
                    "shapE_SEQ": "",
                    "laB_SEQ": "",
                    "coloR_SEQ": "",
                    "puritY_SEQ": "",
                    "polisH_SEQ": "",
                    "cuT_SEQ": "",
                    "symM_SEQ": "",
                    "reporT_NO": "",
                    "PACKET_NO": value,
                    "PREFIX": "",
                    "froM_WGT": 0,
                    "tO_WGT": 0,
                    "ratiO_FROM": 0,
                    "ratiO_TO": 0,
                    "tableP_FROM": 0,
                    "tableP_TO": 0,
                    "depthP_FROM": 0,
                    "depthP_TO": 0,
                    "lengtH_FROM": 0,
                    "lengtH_TO": 0,
                    "widtH_FROM": 0,
                    "widtH_TO": 0,
                    "deptH_FROM": 0,
                    "deptH_TO": 0,
                    "PRATE_FROM": 0,
                    "PRATE_TO": 0,
                    "PVALUE_FROM": 0,
                    "PVALUE_To": 0,
                    "FDISC_PER": 0,
                    "TDISC_PER": 0,
                    "PAGENO": 1,
                    "priceType": "1",
                    "country": "",
                    "partyrole": localStorage.getItem("userType"),
                    "PARTYRATE": 0,
                    "PARTY_CODE": localStorage.getItem("wPartyCode")
                }
                localStorage.setItem("filters", JSON.stringify(filters))
                return;
            case "NON CERTIFIED":
                const nonCsFilters = {
                    "commenT_TYPE": "NON CERTIFIED",
                    "stock": "",
                    "shape": "",
                    "colgrp": "",
                    "purgrp": "",
                    "packeT_NO": value,
                    "grown": "",
                    "f_WGT": 0,
                    "t_WGT": 0,
                    "f_RATIO": 0,
                    "t_RATIO": 0,
                    "f_LENGTH": "",
                    "t_LENGTH": "",
                    "f_WIDTH": "",
                    "t_WIDTH": "",
                    "f_DEPTH": 0,
                    "t_DEPTH": 0,
                    "f_RATE": 0,
                    "t_RATE": 0,
                    "f_VALUE": 0,
                    "t_VALUE": 0,
                    "pageno": 0,
                    "priceType": "1",
                    "location": "",
                    "PAGENO": 1
                }
                localStorage.setItem("filters", JSON.stringify(nonCsFilters));
                router.push("/nonCertifiedResult");
                return;
            case "EXOTIC SHAPES":
                const exoticFilters = {
                    "commenT_TYPE": "EXOTIC SHAPES",
                    "stock": "",
                    "shape": "",
                    "packeT_NO": value,
                    "grown": "",
                    "froM_WGT": "",
                    "tO_WGT": "",
                    "f_RATIO": 0,
                    "t_RATIO": 0,
                    "f_LENGTH": "",
                    "t_LENGTH": "",
                    "f_WIDTH": "",
                    "t_WIDTH": "",
                    "f_DEPTH": 0,
                    "t_DEPTH": 0,
                    "f_RATE": 0,
                    "t_RATE": 0,
                    "f_VALUE": 0,
                    "t_VALUE": 0,
                    "pageno": 0,
                    "priceType": "1",
                    "colgrp": "",
                    "location": "",
                    "f_WGT": 0,
                    "t_WGT": 0,
                    "cut": "",
                    "IS_MATCHING_PAIR": "",
                    "PAGENO": 1
                }
                localStorage.setItem("filters", JSON.stringify(exoticFilters));
                router.push("/exoticResult");
                return;
            case "COLOR CERTIFIED":
                const CsColorfilters = {
                    "deaL_INT_STAGE": "",
                    "shapE_SEQ": "",
                    "laB_SEQ": "",
                    "coloR_SEQ": "",
                    "puritY_SEQ": "",
                    "polisH_SEQ": "",
                    "cuT_SEQ": "",
                    "symM_SEQ": "",
                    "reporT_NO": "",
                    "PACKET_NO": value,
                    "PREFIX": "",
                    "froM_WGT": 0,
                    "tO_WGT": 0,
                    "ratiO_FROM": 0,
                    "ratiO_TO": 0,
                    "tableP_FROM": 0,
                    "tableP_TO": 0,
                    "depthP_FROM": 0,
                    "depthP_TO": 0,
                    "lengtH_FROM": 0,
                    "lengtH_TO": 0,
                    "widtH_FROM": 0,
                    "widtH_TO": 0,
                    "deptH_FROM": 0,
                    "deptH_TO": 0,
                    "PRATE_FROM": 0,
                    "PRATE_TO": 0,
                    "PVALUE_FROM": 0,
                    "PVALUE_To": 0,
                    "FDISC_PER": 0,
                    "TDISC_PER": 0,
                    "PAGENO": 1,
                    "priceType": "1",
                    "country": "",
                    "coloR_DESC": "a",
                    "icolor_desc": "",
                    "partyrole": localStorage.getItem("userType"),
                    "PARTYRATE": 0,
                    "PARTY_CODE": localStorage.getItem("wPartyCode")
                }
                localStorage.setItem("filters", JSON.stringify(CsColorfilters))
                router.push("/color-result/cs-colorResult");
                return;
        }
    }

    const handleSearchClick = () => {
        dispatch(searchApi({ PACKET_NO: searchValue })).then((res) => {
            if (res?.payload?.Table[0]?.COMMENT_TYPE) {
                RedirectRoute(res.payload.Table[0].COMMENT_TYPE, res?.payload?.Table[0]?.PACKET_NO);
            }
        })
    }


    return (
        <span className="relative flex items-center w-full gap-2">
            <input
                placeholder="Stock Id / Report No."
                name="StockId"
                type="text"
                className="w-full shadow-custom rounded-full text-center placeholder:text-sm placeholder:text-gray-500 text-sm text-black drop-shadow outline-none py-1.5 px-4"
                value={searchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
            />
            <FaSearch
                className="absolute right-1 text-gray-500 cursor-pointer"
                onClick={handleSearchClick}
            />
        </span>
    )
}
