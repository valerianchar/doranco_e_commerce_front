import {api_no_auth} from "./overall";
import store from "../store";
import {updateAuth} from "../store/reducer/auth_reducer";


export const Login = async (body) => {
    await api_no_auth.post("/login", body)
        .then(resp => store.dispatch(updateAuth(resp.data)))
        .catch(error => store.dispatch(updateAuth(error.response.data)))
}