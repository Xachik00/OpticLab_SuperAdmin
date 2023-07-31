import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import {  fetching3, fetchSuccess3, fetchError3 } from "../slice/MirrorColorsSlice";
const URL = process.env.REACT_APP_BASE_URL;

export const fetchMirrorColors = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching3());
            const response =await axios.get('styles?title_div='+props);            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccess3(arr));
            
            
        }
        catch(error){
            
            dispatch(fetchError3(error as Error));
        }

    }
}