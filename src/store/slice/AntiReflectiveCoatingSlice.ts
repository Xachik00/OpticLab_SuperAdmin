import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMirrorCoating } from '../action/MirrorCoatingAction'
// import { ITime } from '../../models/model'
interface IAntiReflectiveCoating {
  created_at: string,
  id: number,
  image: string | undefined,
  note: string | undefined,
  text: string,
  title: string,
  title_div: string
  updated_at: string
}
interface AntiReflectiveCoating {
  loading: boolean;
  error: string;
  AntiReflectiveCoating: IAntiReflectiveCoating[]
}

const initialState: AntiReflectiveCoating = {
  loading: false,
  error: "",
  AntiReflectiveCoating: []
}

export const AntiReflectiveCoatingSlice = createSlice({
  name: 'AntiReflectiveCoating',
  initialState,
  reducers: {
    fetching2(state) {
      state.loading = true;
    },
    fetchSuccess2(state, action: PayloadAction<IAntiReflectiveCoating[]>) {
      state.loading = false;
      state.AntiReflectiveCoating = action.payload;
      state.error = ''
    },
    fetchError2(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching2, fetchSuccess2, fetchError2 } = AntiReflectiveCoatingSlice.actions


export default AntiReflectiveCoatingSlice.reducer