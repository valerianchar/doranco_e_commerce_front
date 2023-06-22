import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: {},
        error: "",
    },
    reducers : {
        updateAuth: (state, action) => {
            return {...state, ...action.payload }
        }
    }
})

export const {updateAuth} = authSlice.actions
export default authSlice.reducer