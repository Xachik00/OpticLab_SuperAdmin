import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { fetchMirrorCoating } from '../action/MirrorCoatingAction'
// import { ITime } from '../../models/model'
interface ICompany {
  id: number,
  logo: string | undefined,
  phone: string,
  director: string,
  company_name: string,
  company_address: string,
  created_at: string,
  updated_at: string
}
interface CompanyState {
  loading: boolean;
  error: string;
  Company: ICompany[]
}

const initialState: CompanyState = {
  loading: false,
  error: "",
  Company: []
}

export const CompanySlice = createSlice({
  name: 'Company',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<ICompany[]>) {
      state.loading = false;
      state.Company = action.payload;
      state.error = ''
    },
    fetchError(state, action: PayloadAction<Error>) {
      state.loading = false;
      state.error = action.payload.message
    }
  }
})

export const { fetching, fetchSuccess, fetchError} = CompanySlice.actions


export default CompanySlice.reducer