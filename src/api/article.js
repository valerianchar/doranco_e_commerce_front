import {api, api_no_auth} from "./overall";
import store from "../store";
import {addCommentary, initArticles, updateOneArticlesID} from "../store/reducer/article_reducer";
import {initState} from "../store/reducer/categorie_reducer";

export const AddArticle = async (body, index) => {
    await api.post("/article/add", body)
        .then(resp => {
            console.log(resp);
            let payload = {
                index: index,
                id: resp.data
            }
            store.dispatch(updateOneArticlesID(payload))
        })
        .catch(error => {})
}

export const GetAllArticles = async () => {
    await api_no_auth.get("/article/all")
        .then(resp => {
            store.dispatch(initArticles(resp.data))})
        .catch(error => store.dispatch(initArticles(error.response.data)))
}

export const GetAllCategories = async () => {
    await api_no_auth.get("/categorie/all")
        .then(resp => store.dispatch(initState(resp.data)))
        .catch(error => store.dispatch(initState(error.response.data)))
}

export const AddCommentaire = async (body) => {
    await api.post("/comment/add", body.comm)
        .then(resp => {
            body.comm.id = resp.data
            store.dispatch(addCommentary(body))
        })
        .catch(error => {})
}

export const DeleteArticle = async (id) => {
    await api.delete("/article/delete/"+id)
        .then(resp => {})
        .catch(error => {})
}