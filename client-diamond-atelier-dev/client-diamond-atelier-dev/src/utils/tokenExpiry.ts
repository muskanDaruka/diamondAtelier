import { parseDuration } from "@/helpers/DurationValidation"
import moment from "moment";


const saveToken = (token:string,durationStr:string):void =>{
     
    const duration  = parseDuration(durationStr);
    const expiryDate = moment().add(duration).toISOString();

    localStorage.setItem("Token",token);
    localStorage.setItem('token_expiry', expiryDate);
}


const isTokenExpired = () => {
    const expiry = localStorage.getItem("token_expiry") ?? null;
    if(!expiry) return true;
    return moment().isAfter(moment(expiry));
}


const clearToken = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('token_expiry');
}


export {isTokenExpired, clearToken, saveToken}