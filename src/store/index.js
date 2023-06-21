import {configureStore} from "@reduxjs/toolkit";
import auth_reducer from "./reducer/auth_reducer";
import article_reducer from "./reducer/article_reducer";
import basket_reducer from "./reducer/basket_reducer";
import categorie_reducer from "./reducer/categorie_reducer";

const store = configureStore({
    reducer: {
        auth: auth_reducer,
        articles: article_reducer,
        basket: basket_reducer,
        categories: categorie_reducer,
    },
});

export default store;