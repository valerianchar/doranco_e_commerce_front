import {api} from "./overall";
import store from "../store";
import {initArticles} from "../store/reducer/article_reducer";

export const AddArticle = async (body) => {
    await api.post("/article/add", body)
        .then(resp => {})
        .catch(error => {})
}

export const GetAllArticles = async () => {
    await api.get("/articles/all")
        .then(resp => store.dispatch(initArticles(resp.data)))
        .catch(error => store.dispatch(initArticles(error.response.data)))
}