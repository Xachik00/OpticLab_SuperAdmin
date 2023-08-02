import governmentMembersFullInfo from "../store/slice/GovernmetMembersFullInfo";
import { configureStore } from '@reduxjs/toolkit';
import uniqueProduct from './slice/UniqueProduct';
import LoginStyleReducer from "./slice/LoginStyleSlice";
import MirrorCoatingReducer from './slice/MirrorCoatingSlice';
import AntiReflectiveCoatingReducer from './slice/AntiReflectiveCoatingSlice';
import MirrorColorsReducer from './slice/MirrorColorsSlice';
import UniqueProductReducer from './slice/UniqueProduct'
import GovernmetMembersFullInfoReducer from './slice/GovernmetMembersFullInfo';
import HomeReducer from './slice/HomeSlice';
import ordersReducer from "./slice/OrderInformationSlice";
import MessigeReducer from "./slice/MessigeSlice";
import ClipReducer from "./slice/ClipSlice";
import AboutReducer from "./slice/AboutSlice";
import CompanyReducer from './slice/CompanySlice'


export const store = configureStore({
  reducer: {
    LoginStyle: LoginStyleReducer,
    MirrorCoating: MirrorCoatingReducer,
    AntiReflectiveCoating: AntiReflectiveCoatingReducer,
    MirrorColors: MirrorColorsReducer,
    GovernmetMembersFullInfo: GovernmetMembersFullInfoReducer,
    UniqueProduct: UniqueProductReducer,
    uniqueProduct: uniqueProduct,
    image: governmentMembersFullInfo,
    Home: HomeReducer,
    orders: ordersReducer,
    Messige: MessigeReducer,
    Clip: ClipReducer,
    About:AboutReducer,
    Company:CompanyReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



