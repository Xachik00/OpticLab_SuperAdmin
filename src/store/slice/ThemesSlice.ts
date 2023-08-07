import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IThemes {
  created_at: string,
  id: number|null,
  text: string|null,
  title_div: string
  updated_at: string
}
interface ThemesState {
  loading: boolean;
  error: string;
  Themes: IThemes[]
}

const initialState: ThemesState = {
  loading: false,
  error: "",
  Themes: []
}

export const ThemesSlice = createSlice({
  name: 'Themes',
  initialState,
  reducers: {
    fetchingThemes(state) {
      state.loading = true;
    },
    fetchSuccessThemes(state, action: PayloadAction<IThemes[]>) {
      state.loading = false;
      state.Themes = action.payload;
      state.error = ''
    },
    fetchErrorThemes(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetchingThemes, fetchSuccessThemes, fetchErrorThemes } = ThemesSlice.actions


export default ThemesSlice.reducer