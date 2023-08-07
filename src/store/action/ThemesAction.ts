import { Dispatch } from "@reduxjs/toolkit";
import {  fetchingThemes, fetchSuccessThemes, fetchErrorThemes} from '../slice/ThemesSlice';
import axios from "../../axios/axios";
import adminaxios from "../../axios/adminaxios";


export const fetchThemes = () => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetchingThemes());
            const response =await axios.get('terms'); 
            
            dispatch(fetchSuccessThemes(response.data[0]));
               
        }
        catch(error){
            
            dispatch(fetchErrorThemes(error as Error));
        }

    }
}

export const fetchEditThemes = ({props}:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetchingThemes());
            await adminaxios.put('terms',props); 
        }
        catch(error){
            
            dispatch(fetchErrorThemes(error as Error));
        }

    }
}