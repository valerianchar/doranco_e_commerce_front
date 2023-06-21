import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: {
            profil: "Admin"
        },
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