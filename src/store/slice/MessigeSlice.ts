import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface IMessige {
  created_at: string
  email: string
  id: number
  message: string
  name: string
  seen: boolean
  updated_at: string|undefined
}
interface Messige {
  loading: boolean;
  error: string;
  Messige: IMessige[]
}

const initialState: Messige = {
  loading: false,
  error: "",
  Messige: []
}

export const MessigeSlice = createSlice({
  name: 'Messige',
  initialState,
  reducers: {
    fetching9(state) {
      state.loading = true;
    },
    fetchSuccess9(state, action: PayloadAction<IMessige[]>) {
      state.loading = false;
      state.Messige = action.payload;
      state.error = ''
    },
    fetchError9(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    },

  }
})

export const { fetching9, fetchSuccess9, fetchError9 } = MessigeSlice.actions


export default MessigeSlice.reducer