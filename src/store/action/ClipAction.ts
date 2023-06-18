import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

import {  fetchingClip, fetchSuccessClip, fetchErrorClip } from "../slice/ClipSlice";
import {  fetching } from "../slice/GovernmetMembersFullInfo";
const URL = process.env.REACT_APP_BASE_URL;

export const fetchClip = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetchingClip());
            const response =await axios.get(URL + 'api/v1/superAdmin/styles?title_div='+props);            
            const arr=[]
            for(let key in response.data){
                arr.push(response.data[key])
            }
            dispatch(fetchSuccessClip(arr));   
        }
        catch(error){
            
            dispatch(fetchErrorClip(error as Error));
        }

    }
}

export const fetchAddClip = (name:string,props:string) => {
    return async (dispatch:Dispatch)=>{
        try{
            const newImage={
                title_div:name,
                image:props
            }
            
            await axios.post(URL + 'api/v1/superAdmin/styles/add',newImage);     
            fetchClip(name)
            dispatch(fetching())            

        }
        catch(error){
            console.log(error,'error');            
        }

    }
}




export const EditeClip = (id:number,edit:string) => {
    return async ()=>{
        try{
            const ed = {
                id:id,
                title_div:edit,
            }
            const response =  await axios.put(URL + 'api/v1/superAdmin/styles',ed);       
            console.log(response.data)
           fetchClip(response.data);
        }
    
        catch(error){
            console.log(error,'error');       
        }}
    }
export const deleteClip = (name:string,id:number) => {
    return async ()=>{
        try{     
           const response =  await axios.delete(URL +`api/v1/superAdmin/styles/${id}`);
           console.log(response);
           fetchClip(name)

        }
        catch(error){
            console.log(error,'error');            
        }

    }
}