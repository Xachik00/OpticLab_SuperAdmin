import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching9, fetchSuccess9, fetchError9 } from "../slice/MessigeSlice";
const URL = process.env.REACT_APP_BASE_URL;

export const fetchMessige = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching9());
            const response =await axios.get(URL + 'api/v1/superAdmin/getMessages');              
            localStorage.removeItem('seenArr')
            let seenArr=0
            response?.data?.map((el:any)=>{
                if(el.seen===false)
                seenArr ++
            })
            localStorage.setItem('seenArr',JSON.stringify(seenArr))  
            dispatch(fetchSuccess9(response?.data.reverse()));
        }
        catch(error){
            dispatch(fetchError9(error as Error));
        }

    }
}
export const EditMessige = (id:number) => {
    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(URL +`api/v1/superAdmin/message/${id}`,{seen:true});     
            fetchMessige()
        }
        catch(error){
            dispatch(fetchError9(error as Error));
        }

    }
}
export const DeleteMessige = (id:number) => {
    return async (dispatch:Dispatch)=>{
        try{
            await axios.delete(URL +`api/v1/superAdmin/message/${id}`);     
            fetchMessige()
        }
        catch(error){
            dispatch(fetchError9(error as Error));
        }

    }
}