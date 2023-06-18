import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMirrorCoating } from '../action/MirrorCoatingAction'
// import { ITime } from '../../models/model'
interface IMirrorColors {
  created_at: string,
  id: number,
  image: string | undefined,
  note: string | undefined,
  text: string,
  title: string,
  title_div: string
  updated_at: string
}
interface MirrorColors {
  loading: boolean;
  error: string;
  MirrorColors: IMirrorColors[]
}

const initialState: MirrorColors = {
  loading: false,
  error: "",
  MirrorColors: []
}

export const MirrorColorsSlice = createSlice({
  name: 'MirrorColors',
  initialState,
  reducers: {
    fetching3(state) {
      state.loading = true;
    },
    fetchSuccess3(state, action: PayloadAction<IMirrorColors[]>) {
      state.loading = false;
      state.MirrorColors = action.payload;
      state.error = ''
    },
    fetchError3(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching3, fetchSuccess3, fetchError3 } = MirrorColorsSlice.actions


export default MirrorColorsSlice.reducer