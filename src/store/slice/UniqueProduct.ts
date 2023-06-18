import { createSlice } from "@reduxjs/toolkit";
// import { IMemberFullInfo } from "../../types/models";

/*eslint-disable*/
export interface IMemberFullInfo{
    created_at:string,  
    id:number, 
    fullname:string, 
    picture: string, 
    position: string,
    role:string, 
    status: string,
    surname: string,
    updated_at: string,
    username: string,
    
    }
const initialState = {
    loading: false,
    error: "",
    product:<IMemberFullInfo[]> [],
}


export const uniqueProduct = createSlice({
    name: "product",
    initialState,
    reducers: {
        fetching(state) {
            state.loading = true;
        },
        fetchSucces(state, action) {
            state.product[0] = action.payload;
            state.loading = false;
        },
        fetchError(state, action) {
            state.error = action.payload.message
        }
    }
});

export const { fetching, fetchSucces, fetchError } = uniqueProduct.actions;
export default uniqueProduct.reducer;


/*eslint-disable*/