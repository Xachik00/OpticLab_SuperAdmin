import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    loading:false,
    error:"",
    image:'',
}

export const imageSlice = createSlice({
  name: 'imageSlice',
    initialState,
  reducers: {
    fetching(state){
        state.loading = true;
    },
    fetchSuccess(state,action){
        state.loading = false;
        state.image = action.payload;
        state.error = ''
    },
    fetchError(state,action){
        state.loading = false;
        state.error = action.payload.message
    }
  }
})

export const {  fetching, fetchSuccess, fetchError } = imageSlice.actions


export default imageSlice.reducer