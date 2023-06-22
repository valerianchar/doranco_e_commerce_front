import {createSlice} from "@reduxjs/toolkit";


const articleReducer = createSlice({
    name: "articles",
    initialState: {
        data: [],
        error: "",
    },
    reducers: {
        initArticles: (state, action) => {
            return {...state, ...action.payload}
        },
        addOneArticle: (state, action) => {
            const updateArticles = [...state.data]
            updateArticles.push(action.payload)
            return {...state, data: updateArticles}
        },
        updateOneArticle: (state, action) => {
            const {index, update} = action.payload
            const updateArticles = [...state.data]
            updateArticles[index] = {
                ...updateArticles[index],
                id: update.id,
                nom: update.nom,
                description: update.description,
                prix: update.prix,
                remise: update.remise,
                stock: update.stock,
                is_vendable: update.is_vendable,
                photo: update.photo,
                video: update.video,
                commentaires: update.commentaires,
                categorie: update.categorie
            }
            return { ...state, data: updateArticles }
        },
        removeOneArticle: (state, action) => {
            const updateArticles = [...state.data]
            let update = updateArticles.filter((elem, i) => i !== action.payload.index)
            return {...state, data: update}
        },

        addCommentary: (state, action) => {
            console.log(action.payload)
            const articles = [...state.data]
            articles[action.payload.index].commentaires.push(action.payload.comm)
        }
    }
})

export const {initArticles, updateOneArticle, addOneArticle, removeOneArticle, addCommentary} = articleReducer.actions
export default articleReducer.reducer