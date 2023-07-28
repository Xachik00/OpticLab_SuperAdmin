import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/OrderInformationSlice";
import adminaxios from "../../axios/adminaxios";

export const fetchOrders = ()=>{
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());

            const response =await axios.get('getColumns'); 
            const item = response.data
            
            dispatch(fetchSuccess(item));
        }
        catch(error){
            dispatch(fetchError(error as Error));
        }

    }
} 


export const deletes = (table: any, item: string)=> {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetching());
            const response = await  adminaxios({
                method: 'delete',
                url: 'dropColumn',
                data:     {tableName:table, columnName:item}
              });
            dispatch(fetchSuccess(response.data));

        }catch(error){
            dispatch(fetchError(error as Error));
        }
    
}
    
  }