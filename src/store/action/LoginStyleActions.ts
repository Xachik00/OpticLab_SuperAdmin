import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/LoginStyleSlice";
const URL = process.env.REACT_APP_BASE_URL;

export const fetchLoginStyle = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response =await axios.get(URL + 'api/v1/superAdmin/loginOptions/1');            
            dispatch(fetchSuccess(response.data));            
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
}