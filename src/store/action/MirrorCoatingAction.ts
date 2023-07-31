import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import {  fetching1, fetchSuccess1, fetchError1 } from "../slice/MirrorCoatingSlice";
import adminaxios from "../../axios/adminaxios";
const URL = process.env.REACT_APP_BASE_URL;


export const fetchMirrorCoating = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching1());
            const response =await axios.get('styles?title_div='+props);            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccess1(arr));  
             
        }
        catch(error){
            
            dispatch(fetchError1(error as Error));
        }

    }
}

export const editStyles=({props,fetch}:any)=>{
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching1());
            const response =await adminaxios.put('styles',props);            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetch(arr));  
             
        }
        catch(error){
            
            dispatch(fetchError1(error as Error));
        }

    }
}

