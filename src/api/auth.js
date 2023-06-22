import {api_no_auth} from "./overall";
import store from "../store";
import {updateAuth} from "../store/reducer/auth_reducer";
import Cookies from "universal-cookie";

const cookie = Cookies()


export const Login = async (body) => {
    await api_no_auth.post("/utilisat/auth", body)
        .then(resp => {
            store.dispatch(updateAuth(resp.data))
            cookie.set("user", resp.data.data)
            window.location.href = "/"
        })
        .catch(error => store.dispatch(updateAuth(error.response.data)))
}