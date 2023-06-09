import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  isLogin?: boolean;
  username: string | null;
  location: any;
  screenHeight: number;
  userInfo: any;
}

const initialState: AppStateType = {
  isLogin: false,
  username: null,
  location: {},
  screenHeight: 0,
  userInfo: {},
};

const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    setLocations: (state, { payload }) => {
      state.location = payload;
    },
    setLayoutHeight: (state, { payload }) => {
      state.screenHeight = payload;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
});

export const { setLoginStatus, setLocations, setLayoutHeight, setUserInfo } = appSlice.actions;
export default appSlice.reducer;
