import { configureStore } from "@reduxjs/toolkit"
import { thunk } from "redux-thunk"
import logger from "redux-logger";
import { rootReducer } from "./combineReducer";


const makeStore = () =>{
    return configureStore({
        reducer:rootReducer,
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(thunk,logger)
        },
    })
}

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppStore = ReturnType<Store["getState"]>

export default makeStore;