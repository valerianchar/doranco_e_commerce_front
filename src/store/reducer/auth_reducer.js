import {createSlice} from "@reduxjs/toolkit";
import {getJsonCookie} from "../../utils/cookie";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: getJsonCookie("user") || {},
        error: "",
    },
    reducers : {
        updateAuth: (state, action) => {
            return {...state, ...action.payload }
        },
        killAuth: (state) => {
            return {...state, data: {}}
        }
    }
})

export const {updateAuth, killAuth} = authSlice.actions
export default authSlice.reducer