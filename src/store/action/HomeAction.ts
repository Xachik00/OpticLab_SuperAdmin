import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching4, fetchSuccess4, fetchError4 } from "../slice/HomeSlice";
import {  fetching } from "../slice/GovernmetMembersFullInfo";
// import {}
const URL = process.env.REACT_APP_BASE_URL;

export const fetchHome = () => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching4());
            const response =await axios.get(URL + 'api/v1/superAdmin/home');            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccess4(arr));
            console.log(arr);
            
            
        }
        catch(error){
            // console.log(error,'error');
            
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
            
            await axios.post(URL + 'api/v1/superAdmin/home/add',newImage);     
             fetchHome()
            dispatch(fetching())
            console.log('acacaca');
            
            
        }
        catch(error){
            console.log(error,'error');            
        }

    }
}


export const deleteHome = (id:number) => {
    return async ()=>{
        try{
            
            
           const response =  await axios.delete(URL +`api/v1/superAdmin/home/${id}`);     
          
           console.log(response);
            
           
           fetchHome()
            
            
            
        }
        catch(error){
            console.log(error,'error');            
        }

    }
}