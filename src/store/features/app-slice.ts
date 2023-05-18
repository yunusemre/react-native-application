import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  isLogin?: boolean;
  username: string | null;
  access_token: string | null;
  location: any | null;
}

const initialState: AppStateType = {
  isLogin: false,
  username: null,
  access_token: null,
  location: null,
};

const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setToken: (state, action: any) => {
      state.access_token = action.payload.access_token;
      state.username = action.payload.username;
    },
    resetToken: (state) => {
      state.access_token = null;
      state.username = null;
    },
    setLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
    setLocations: (state, { payload }) => {
      state.location = payload;
    },
  },
});

export const { setToken, resetToken, setLoginStatus, setLocations } = appSlice.actions;
export default appSlice.reducer;
