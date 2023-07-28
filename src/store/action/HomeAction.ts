import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import {  fetching4, fetchSuccess4, fetchError4 } from "../slice/HomeSlice";
import {  fetching } from "../slice/GovernmetMembersFullInfo";
import  axiosadmin  from "../../axios/adminaxios";

export const fetchHome = () => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching4());
            const response =await axios.get('home');            
            const arr=[]
            console.log(response);
            
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccess4(arr));
            
            
        }
        catch(error){
            
            dispatch(fetchError4(error as Error));
        }

    }
}
export const fetchAddHome = (props:string) => {
    return async (dispatch:Dispatch)=>{
        try{
            const newImage={
                image:props
            }
            console.log(newImage);
            
            await axiosadmin.post('home/add',newImage);     
             fetchHome()
            dispatch(fetching())
            
            
        }
        catch(error){
            console.log(error,'error');            
        }

    }
}


export const deleteHome = (id:number) => {
    return async ()=>{
        try{
            const res=await axiosadmin.delete(`home/${id}`);
            console.log(res);
            
            fetchHome()
        }
        catch(error){
            console.log(error,'error');            
        }

    }
}