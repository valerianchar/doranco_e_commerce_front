import {createSlice} from "@reduxjs/toolkit";


const articleReducer = createSlice({
    name: "articles",
    initialState: {
        data: [
            {
                id: 0,
                nom: "Graines de sarazin",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet, ante in laoreet consectetur, ipsum tellus vulputate risus, eget laoreet justo lectus vitae ante. Nullam sed quam blandit, rhoncus urna a, rhoncus ante. Vestibulum condimentum lacinia cursus. Cras eget sagittis purus. Etiam tempus lorem porttitor erat condimentum, sed malesuada leo convallis. Aliquam mollis eget dui in iaculis. Sed faucibus ac nibh vel consectetur. Nulla ut nibh et ante commodo venenatis. Etiam ultricies mattis vestibulum. Sed accumsan ut dolor nec condimentum.",
                prix: 100,
                remise: 70,
                stock: 15,
                is_vendable: true,
                photo: "https://i0.wp.com/portdattache.bzh/wp-content/uploads/2018/03/graine-de-sarrasin-focus.jpg?ssl=1",
                video: "",
                commentaires: [],
                categorie: 1
            },
        ],
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