import {createSlice} from "@reduxjs/toolkit";

const categorieSlice = createSlice({
    name: "categories",
    initialState: {
        data: [
            {
                id: 1,
                nom: "test",
                remise: 0,
                isRemiseCumulable: true,
                photo: "",
            },
            {
                id: 2,
                nom: "test 2",
                remise: 0,
                isRemiseCumulable: true,
                photo: "",
            },
            {
                id: 3,
                nom: "test 3",
                remise: 0,
                isRemiseCumulable: true,
                photo: "",
            }
        ],
        error: "",
    },
    reducers: {
        initState: (state, action) => {
            return {...state, ...action}
        }
    }
})

export const {initState} = categorieSlice.actions
export default categorieSlice.reducer