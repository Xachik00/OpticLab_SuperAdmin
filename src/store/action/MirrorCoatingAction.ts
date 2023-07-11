import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching1, fetchSuccess1, fetchError1 } from "../slice/MirrorCoatingSlice";
const URL = process.env.REACT_APP_BASE_URL;


export const fetchMirrorCoating = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching1());
            const response =await axios.get(URL + 'api/v1/superAdmin/styles?title_div='+props);            
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


