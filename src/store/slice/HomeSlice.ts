import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IHome {
  created_at: string,
  id: number,
  image: string | undefined,
  updated_at: string
}
interface Home {
  loading: boolean;
  error: string;
  Home: IHome[]
}

const initialState: Home = {
  loading: false,
  error: "",
  Home: []
}

export const HomeSlice = createSlice({
  name: 'Home',
  initialState,
  reducers: {
    fetching4(state) {
      state.loading = true;
    },
    fetchSuccess4(state, action: PayloadAction<IHome[]>) {
      state.loading = false;
      state.Home = action.payload;
      state.error = ''
    },
    fetchError4(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    },
    
  }
})

export const { fetching4, fetchSuccess4, fetchError4 } = HomeSlice.actions


export default HomeSlice.reducer