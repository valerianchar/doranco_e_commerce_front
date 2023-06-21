import {createSlice} from "@reduxjs/toolkit";


const basketSlice = createSlice({
    name: "basket",
    initialState:{
        data: [],
        error: "",
    },
    reducers: {
        initialBasket: (state, action) => {
            return {...state, ...action.payload}
        },
        addOneQteToBasketItem: (state, action) => {
            const {index} = action.payload
            const updateBasket = [...state.data]
            updateBasket[index] = {
                ...updateBasket[index],
                quantite: updateBasket[index].quantite + 1
            }
            return { ...state, data: updateBasket };
        },
        removeOneQteToBasketItem: (state, action) => {
            const updateBasket = [...state.data]
            let index = undefined
            for(let i=0;i<updateBasket.length;i++) {
                if (updateBasket[i].article === action.payload.article_id) {
                    index = i
                    break
                }
            }
            updateBasket[index] = {
                ...updateBasket[index],
                quantite: updateBasket[index].quantite - 1
            }
            return { ...state, data: updateBasket };
        },
        addNewItemToBasket: (state, action) => {
            const updateBasket = [...state.data]
            updateBasket.push(action.payload)
            return { ...state, data: updateBasket };
        },
        removeItemFromBasket: (state, action) => {
            const updateBasket = [...state.data]
            let index = undefined
            for(let i=0;i<updateBasket.length;i++) {
                if(updateBasket[i].article === action.payload.article_id) {
                    index = i
                    break
                }
            }
            if (index === undefined) {
                return
            }
            updateBasket.splice(updateBasket[index], 1)
            return { ...state, data: updateBasket };
        }
    }
})

export const {initialBasket, removeOneQteToBasketItem, addOneQteToBasketItem, addNewItemToBasket, removeItemFromBasket} = basketSlice.actions
export default basketSlice.reducer