import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  isLogin: boolean;
  name: string;
  moyList: any[];
  moyListOffline: any[];
}

const initialState: AppStateType = {
  isLogin: false,
  name: 'Admin',
  moyList: [],
  moyListOffline: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    check: (state) => {
      state.isLogin = !state.isLogin;
    },
    setMoyLists: (state, { payload }) => {
      state.moyList = payload;
    },
  },
});

export const { check, setMoyLists } = appSlice.actions;
export default appSlice.reducer;
