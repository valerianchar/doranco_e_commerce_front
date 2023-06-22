import {createSlice} from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookie = Cookies()

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: cookie.get("user") || {},
        error: "",
    },
    reducers : {
        updateAuth: (state, action) => {
            return {...state, data: action.payload }
        }
    }
})

export const {updateAuth} = authSlice.actions
export default authSlice.reducer