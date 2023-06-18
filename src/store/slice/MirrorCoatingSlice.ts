import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMirrorCoating } from '../action/MirrorCoatingAction'
// import { ITime } from '../../models/model'
interface IMirrorCoating {
  created_at: string,
  id: number,
  image: null,
  note: null,
  text: string,
  title: string,
  title_div: string
  updated_at: string
}
interface MirrorCoatingState {
  loading: boolean;
  error: string;
  MirrorCoating: IMirrorCoating[]
}

const initialState: MirrorCoatingState = {
  loading: false,
  error: "",
  MirrorCoating: []
}

export const MirrorCoatingSlice = createSlice({
  name: 'clipAndStyle',
  initialState,
  reducers: {
    fetching1(state) {
      state.loading = true;
    },
    fetchSuccess1(state, action: PayloadAction<IMirrorCoating[]>) {
      state.loading = false;
      state.MirrorCoating = action.payload;
      state.error = ''
    },
    fetchError1(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching1, fetchSuccess1, fetchError1 } = MirrorCoatingSlice.actions


export default MirrorCoatingSlice.reducer