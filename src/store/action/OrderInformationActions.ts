import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/OrderInformationSlice";
const URL = process.env.REACT_APP_BASE_URL;

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
            const response = await  axios({
                method: 'delete',
                url: URL + 'api/v1/superAdmin/dropColumn',
                data:     {tableName:table, columnName:item}
                
              });
              console.log(JSON.stringify({tableName:table, columnName:item}));
              console.log(response)
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            console.log(JSON.stringify(response))
            dispatch(fetchSuccess(response.data));

        }catch(error){
            dispatch(fetchError(error as Error));
        }
    
}
    
  }