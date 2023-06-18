import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMirrorCoating } from '../action/MirrorCoatingAction'
// import { ITime } from '../../models/model'
interface IClip {
  created_at: string,
  id: number,
  image: string|null,
  note: string|null,
  text: string|null,
  title: string|null,
  title_div: string|null,
  updated_at: string|null
}
interface ClipState {
  loading: boolean;
  error: string;
  Clip: IClip[]
}


const initialState: ClipState = {
  loading: false,
  error: "",
  Clip: []
}

export const ClipSlice = createSlice({
  name: 'Clip',
  initialState,
  reducers: {

    fetchingClip(state) {
      state.loading = true;
    },
    fetchSuccessClip(state, action: PayloadAction<IClip[]>) {

      state.loading = false;
      state.Clip = action.payload;
      state.error = ''
    },
    fetchErrorClip(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetchingClip, fetchSuccessClip, fetchErrorClip } = ClipSlice.actions



export default ClipSlice.reducer