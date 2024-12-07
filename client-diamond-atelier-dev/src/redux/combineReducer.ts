import { combineReducers } from "@reduxjs/toolkit";

import fancyLayoutsReducer from "./FancyLayouts/fancyLayoutsReducer";
import signUpReducer from "./SignUp/signUpReducer";
import getAllCountryReducer from "./SignUp/getAllCountryReducer";
import getKycMasterReducer from "./SignUp/getKycMasterReducer";
import signInReducer from "./SignIn/SignInReducer";
import exoticShapesReducer from "./ExoticShapes/exoticShapesReducer";
import nonCertifiedReducer from "./NonCertified/nonCertifiedReducer";
import holdStoneReducer from "./holdStone/HoldStone";
import getAllStoneReducer from "./certifiedStone/getAllStone";
import clientListReducer from "./seller/ClientListReducer";
import getApprovedUserReducer, { getApprovedUserApi } from "./approvalLogin/saveUserApproval";
import addToCartReducer from "./Cart/addCart";
import getCartDataReducer from "./Cart/getCartData";
import getUserDetailReducer from "./getUserDetail/getUserDetails";
import removeFromCartReducer from "./Cart/removeFromCart";
import getKycApprovedUserReducer from "./kyc/getKycApprovedUser";
import approveUserKycReducer from "./kyc/approveUserKyc";
import getAllHoldStoneReducer from "./holdStone/getAllHoldStone";
import meleePointersReducer from "./MeleePointers/meleePointersReducer";
import getCsMeleeReducer from "./color/cs-melee/getCsMeleeReducer";
import MemoDetailsReducer from "./FancyLayouts/memoDetailsReducer";
import StockDetailsReducer from "./FancyLayouts/stockDetailsReducer";
import getAllMemoReducer from "./memo/getMemoData";
import searchReducer from "./search/searchReducer";



export const rootReducer = combineReducers({
    clientListReducer,
    signInReducer,
    getAllStoneReducer, 
    fancyLayoutsReducer,
    nonCertifiedReducer,
    signUpReducer,
    exoticShapesReducer,
    getAllCountryReducer,
    getKycMasterReducer,
    holdStoneReducer,
    addToCartReducer,
    getCartDataReducer,
    getUserDetailReducer,
    removeFromCartReducer,
    getKycApprovedUserReducer,
    getApprovedUserReducer,
    approveUserKycReducer,
    getAllHoldStoneReducer,
    meleePointersReducer,
    getCsMeleeReducer,
    MemoDetailsReducer,
    StockDetailsReducer,
    getAllMemoReducer,
    searchReducer
})


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
