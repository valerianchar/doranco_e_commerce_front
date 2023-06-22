import {createSlice} from "@reduxjs/toolkit";

const categorieSlice = createSlice({
    name: "categories",
    initialState: {
        data: [
        ],
        error: "",
    },
    reducers: {
        initState: (state, action) => {
            return {...state, ...action.payload}
        }
    }
})

export const {initState} = categorieSlice.actions
export default categorieSlice.reducer