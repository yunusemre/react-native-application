import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  isLogin?: boolean;
  username: string | null;
  location: any;
  screenHeight: number;
}

const initialState: AppStateType = {
  isLogin: false,
  username: null,
  location: {},
  screenHeight: 0,
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
  },
});

export const { setLoginStatus, setLocations, setLayoutHeight } = appSlice.actions;
export default appSlice.reducer;
