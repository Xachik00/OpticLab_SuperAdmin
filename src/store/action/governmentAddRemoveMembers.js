import adminaxios from "../../axios/adminaxios";
import {  fetching, fetchSuccess, fetchError } from "../slice/GovernmetMembersFullInfo";

export const uploadImage = (e)=>{
    return async (dispatch)=>{
        try{
            dispatch(fetching());
            const formData = new FormData();
                    formData.append('image', e);
                    if(formData.has('image')){
                    try {
                        const response = await adminaxios.post('upload', formData);
                        dispatch(fetchSuccess(response.data?.dirname));
                    } catch (error) {
                        console.log(error,"Server request is failed");
                        return "Server request is failed";
                    }}
            
        }
        catch(error){
            dispatch(fetchError(error));
        }

    }
}








