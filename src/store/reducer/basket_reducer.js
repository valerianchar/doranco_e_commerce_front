import {createSlice} from "@reduxjs/toolkit";


const basketSlice = createSlice({
    name: "basket",
    initialState:{
        data: {
            basket: []
        },
        error: "",
        status: ""
    },
    reducers: {
        initialBasket: (state, action) => {
            return {...state, ...action}
        },
        addOneQteToBasketItem: (state, action) => {
            const {index} = action.payload
            const updateBasket = [...state.data.basket]
            updateBasket[index] = {
                ...updateBasket[index],
                quantite: updateBasket[index].quantite + 1
            }
            return { ...state, data: { ...state.data, basket: updateBasket } };
        },
        removeOneQteToBasketItem: (state, action) => {
            const updateBasket = [...state.data.basket]
            let index = undefined
            for(let i=0;i<updateBasket.length;i++) {
                if(updateBasket[i].article === action.payload.article_id) {
                    index = i
                    break
                }
            }
            updateBasket[index] = {
                ...updateBasket[index],
                quantite: updateBasket[index].quantite - 1
            }
            return { ...state, data: { ...state.data, basket: updateBasket } };
        },
        addNewItemToBasket: (state, action) => {
            const updateBasket = [...state.data.basket]
            updateBasket.push(action.payload)
            return {...state, data: {...state.data, basket: updateBasket}}
        },
        removeItemFromBasket: (state, action) => {
            const updateBasket = [...state.data.basket]
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
            return {...state, data: { ...state.data, basket: updateBasket } }
        }
    }
})

export const {initialBasket, removeOneQteToBasketItem, addOneQteToBasketItem, addNewItemToBasket, removeItemFromBasket} = basketSlice.actions
export default basketSlice.reducer