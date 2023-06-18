import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { ITime } from '../../models/model'
interface ILoginStyle {
  buttonBg_color:  string
  created_at:string
  id: number
  loginBg_color:string
  login_color:string
  login_title:string
  password_title:string
  registration_title:string
  remember_title:string
  signIn_title:string
  signUp_title:string
  title:string
  updated_at:string
}
interface LoginStyle {
  loading: boolean;
  error: string;
  LoginStyle: ILoginStyle[]
}

const initialState: LoginStyle = {
  loading: false,
  error: "",
  LoginStyle: []
}

export const LoginStyleSlice = createSlice({
  name: 'LoginStyle',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<ILoginStyle[]>) {
      state.loading = false;
      state.LoginStyle = action.payload;
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching, fetchSuccess,  fetchError } = LoginStyleSlice.actions


export default LoginStyleSlice.reducer