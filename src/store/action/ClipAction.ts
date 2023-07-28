import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import adminaxios from "../../axios/adminaxios";
import {  fetchingClip, fetchSuccessClip, fetchErrorClip } from "../slice/ClipSlice";
import {  fetching } from "../slice/GovernmetMembersFullInfo";

export const fetchClip = (props:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
            dispatch(fetchingClip());
            const response =await axios.get('styles?title_div='+props);            
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
            
            await adminaxios.post('styles/add',newImage);     
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
            const response =  await adminaxios.put('styles',ed);       
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
           const response =  await adminaxios.delete(`styles/${id}`);
           console.log(response);
           fetchClip(name)

        }
        catch(error){
            console.log(error,'error');            
        }

    }
}