import { Dispatch } from "@reduxjs/toolkit";
import { fetching, fetchSucces, fetchError } from "../slice/UniqueProduct"
import axios from "axios";
const URL = process.env.BACK_APP_BASE_URL;
export const uniqueProductAction = (id: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            const response = await axios.get(URL +`api/v1/users/${id}`);
            if (response.status===200 && response.statusText==="OK") {
                dispatch(fetchSucces(response.data))
            }

        }
        catch (error) {
            dispatch(fetchError(error as Error))
        }
    }
}
