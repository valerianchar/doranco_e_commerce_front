import axios from "axios";
//import Cookies from "universal-cookie";
import store from "../store";


//const cookie = new Cookies()

export const api_no_auth = axios.create({
    baseURL: "http://localhost:8080/ECommerceBack/rest",
    headers: {
        'Content-Type': "application/json"
    },
})

export const api = axios.create({
    baseURL: "http://localhost:8080/ECommerceBack/rest",
    headers: {
        'Content-Type': "application/json"
    },
})

api.interceptors.request.use(
    function (config) {

        config.headers.Authorization = store.getState().auth.data.user.id

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);