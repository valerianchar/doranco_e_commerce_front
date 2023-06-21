import {api} from "./overall";
import store from "../store";
import {initArticles} from "../store/reducer/article_reducer";

export const AddArticle = async (body) => {
    await api.post("/article/add", body)
        .then(resp => {
            store.dispatch(initArticles(resp.data))
            window.location.href = "/"
        })
        .catch(error => store.dispatch(initArticles(error.response.data)))
}
