import { Dispatch } from "@reduxjs/toolkit";
import {  fetching, fetchSuccess, fetchError } from "../slice/LoginStyleSlice";
import axios from "../../axios/axios";

export const fetchLoginStyle = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get('loginOptions/1');  
                      
            dispatch(fetchSuccess(response.data));            
        }
        catch(error){
            
            dispatch(fetchError(error as Error));
        }

    }
}