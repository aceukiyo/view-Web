import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { useStorage } from "../hooks/useStorage";
const baseUrl = import.meta.env.VITE_VUE_BASE_API_URL + import.meta.env.VITE_BASE_PATH;


const { getStorage } = useStorage();
const accessToken = getStorage("view_token");
console.log("hahhahah", accessToken)
// async function axiosService<T,D>(accessToken:string, contentType:string,data:T,method:string,url:string){
const service: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 50000
});
// http request interceptor
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config && config.headers) {
            accessToken ? config.headers.Authorization = `Bearer ${accessToken}` : null;
        }

        //    config.headers = {
        //     'token': accessToken,
        //     'Content-Type':contentType
        //    }
        //    config.data = data;
        //    config.method = method;
        //    config.url = url;
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        } else {
            Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);
//}


export default service;
