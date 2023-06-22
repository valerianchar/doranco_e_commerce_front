import {api, api_no_auth} from "./overall";
import store from "../store";
import {killAuth, updateAuth} from "../store/reducer/auth_reducer";
import {createJsonCookie} from "../utils/cookie";

export const Login = async (body) => {
    await api_no_auth.post("/utilisat/auth", body)
        .then(resp => {
            createJsonCookie("user", resp.data.data, 3)
            store.dispatch(updateAuth(resp.data))
        })
        .catch(error => store.dispatch(updateAuth(error.response.data)))
}
export const Logout = async () => {
    await api.get("/utilisat/logout")
        .then(resp => store.dispatch(killAuth()))
        .catch(error => {})
}