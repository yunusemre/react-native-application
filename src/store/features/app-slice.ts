import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  isLogin?: boolean;
  username: string | null;
  location: any;
}

const initialState: AppStateType = {
  isLogin: false,
  username: null,
  location: {},
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
  },
});

export const { setLoginStatus, setLocations } = appSlice.actions;
export default appSlice.reducer;
