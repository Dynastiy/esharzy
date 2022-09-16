import axios from "axios";
import config from "./api";

export default function() {
    let token;

    //Set Token 

    token = localStorage.getItem('token')

    // When sending a request, if there is a token, it needs to be attached to the request header
    let instance = axios;

    if (token) {
        // console.log(token);
        instance = axios.create({
            baseURL: `${config.baseUrl}`,
            headers: {
                Authorization: "bearer " + token,
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                // "Access-Control-Max-Age": 600,
            },
        });
    } else {
        // console.log(storeObj.auth);
        instance = axios.create({
            baseURL: `${config.baseUrl}`,
            headers: {
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                // "Access-Control-Max-Age": 600,
            },
        });
    }

    instance.interceptors.response.use(
        (resp) => {
            return resp;
        },
        (err) => {
            // Permission denied.
            if (err.response && err.response.status === 403) {
                console.log(9090);
                localStorage.clear();
                return Promise.reject(err);
            }
            if (err.response && err.response.status === 500) {
                // window.location.href = "/login";
                console.log(9090);
                return Promise.reject(err);
            }

            //  Invalid token, Not Authenticated.
            if (err.response && err.response.status === 401) {
                console.log(9090);
                // if (storeObj.auth) {

                // }


            }

            return Promise.reject(err);
        }
    );

    return instance;
}