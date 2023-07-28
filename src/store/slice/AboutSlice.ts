import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { fetchMirrorCoating } from '../action/MirrorCoatingAction'
// import { ITime } from '../../models/model'
interface IAbout {
  created_at: string,
  id: number,
  image: string | undefined,
  note: null,
  text: string,
  title: string,
  title_div: string
  updated_at: string
}
interface AboutState {
  loading: boolean;
  error: string;
  About: IAbout[]
}

const initialState: AboutState = {
  loading: false,
  error: "",
  About: []
}

export const AboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    fetching11(state) {
      state.loading = true;
    },
    fetchSuccess11(state, action: PayloadAction<IAbout[]>) {
      state.loading = false;
      state.About = action.payload;
      state.error = ''
    },
    fetchError11(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching11, fetchSuccess11, fetchError11 } = AboutSlice.actions


export default AboutSlice.reducer