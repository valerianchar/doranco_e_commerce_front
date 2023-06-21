import {configureStore} from "@reduxjs/toolkit";
import auth_reducer from "./reducer/auth_reducer";
import article_reducer from "./reducer/article_reducer";
import basket_reducer from "./reducer/basket_reducer";

const store = configureStore({
    reducer: {
        auth: auth_reducer,
        articles: article_reducer,
        basket: basket_reducer,
    },
});

export default store;