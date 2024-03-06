import request from '../utils/request';
import Qs from 'qs';
import { ElMessage } from "element-plus";
 
const accessToken = localStorage.getItem("view_token") || sessionStorage.getItem("view_token");
export interface ApiResult<T> {
    code: number;
    status: boolean;
    message: string;
    data: T;
   }
    async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await request.get<ApiResult<T>>(url,{ params });
    return response.data;
   }
    async function post<T>(url: string, data?: any,config?: any): Promise<ApiResult<T>> {
    const response = await request.post<ApiResult<T>>(url, data,config);
    return response.data;
   }
    async function put<T>(url: string, data?: any,config?: any): Promise<ApiResult<T>> {
    const response = await request.put<ApiResult<T>>(url, data,config);
    return response.data;
   }
    async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await request.delete<ApiResult<T>>(url, { params });
    return response.data;
   }
    
   export async function Get<T>(url:string ,params:object){
    return await get(url+`?${ Qs.stringify(params)}`);
  }
   export async function Post<T>(url:string ,data:object){
    const result= await post(url,data,{headers: {'Content-Type': "application/json; charset=utf-8"}});
    if(result.code==200 && result.status==true){
       ElMessage.success();
    }else{
       ElMessage.error();
    }
    return result;
   }
   export async function Delete<T>(url:string,params:any) {
   const result= await del(url+`?${Qs.stringify(params)}`,{headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
    if(result.code==200 && result.status == true){
      ElMessage.success();
    }else {
      ElMessage.error();
    }
    return result;
   };

   export async function Put(url:string,data:object) {
    const result =await put(url,data,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}});
    if(result.code==200 && result.status == true){
      ElMessage.success();
    }else {
      ElMessage.error();
    }
    return result;
   };

   export async function Upload(url:string,data:FormData) {
    const result=await post(url,data,{headers: {'Content-Type': 'amultipart/form-data'}});
    if(result.code == 200 && result.status == true){
      ElMessage.success();
    }else{
      ElMessage.error();
    }
    return result;  
   }