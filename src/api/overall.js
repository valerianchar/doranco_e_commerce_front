import axios from "axios";
import store from "../store";

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

        config.headers.Authorization = "Bearer "+store.getState().auth.data.profil

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);