import { Dispatch } from "@reduxjs/toolkit";
import { fetching, fetchSucces, fetchError } from "../slice/UniqueProduct"
import {useraxios} from "../../axios/axios";

export const uniqueProductAction = (id: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching());
            const response = await useraxios.get(`${id}`);
            if (response.status===200 && response.statusText==="OK") {
                dispatch(fetchSucces(response.data))
            }

        }
        catch (error) {
            dispatch(fetchError(error as Error))
        }
    }
}
