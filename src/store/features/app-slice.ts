import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  isLogin?: boolean;
  username: string | null;
  userInfo: any | null;
  location: any;
  allParameters: any;
  userMenu: any;
}

const initialState: AppStateType = {
  isLogin: false,
  username: null,
  userInfo: null,
  location: {},
  allParameters: {},
  userMenu: {},
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
    setUsername: (state, { payload }) => {
      state.username = payload;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    setAllParameters: (state, { payload }) => {
      state.allParameters = payload;
    },
    setUserMenu: (state, { payload }) => {
      state.userMenu = payload;
    },
  },
});

export const {
  setLoginStatus,
  setLocations,
  setUserMenu,
  setUsername,
  setUserInfo,
  setAllParameters,
} = appSlice.actions;
export default appSlice.reducer;
