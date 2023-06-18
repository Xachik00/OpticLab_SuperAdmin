import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrders } from '../../models/model'

interface OrdersState {
   loading: boolean;
   error:string;
   orders:IOrders[]
}

const initialState:OrdersState = {
    loading: false,
    error:"",
    orders:[],
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccess(state,action: PayloadAction<IOrders[]>){
        state.loading = false;
        state.orders = action.payload;
        state.error = ''
    },
    fetchError(state,action: PayloadAction<Error>){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetchSuccess, fetchError } = ordersSlice.actions


export default ordersSlice.reducer