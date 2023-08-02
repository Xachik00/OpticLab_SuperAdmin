import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/adminaxios";
import {  fetching, fetchSuccess, fetchError } from "../slice/CompanySlice";

export const fetchCompany = () => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetching());
            const response =await axios.get('companySettings');            
          
            dispatch(fetchSuccess(response.data));   
        }
        catch(error){
            
            dispatch(fetchError(error as Error));
        }

    }
}