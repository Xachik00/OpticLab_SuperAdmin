import axios from "axios";
import {  fetching, fetchSuccess, fetchError } from "../slice/GovernmetMembersFullInfo";

const URL = process.env.REACT_APP_BASE_URL;

export const uploadImage = (e,func)=>{
    return async (dispatch)=>{
        try{
            dispatch(fetching());
            const formData = new FormData();
                    formData.append('image', e);
                    if(formData.has('image')){
                    try {
                        const response = await axios.post(`${URL}api/v1/superAdmin/upload`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        dispatch(fetchSuccess(response.data?.dirname));
                        // response?.data?.dirname && func()  
                        
                    } catch (error) {
                        return "Server request is failed";
                    }}
            
        }
        catch(error){
            dispatch(fetchError(error));
        }

    }
}








