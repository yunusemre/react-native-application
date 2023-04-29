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
    setMoyListsOffline: (state, { payload }) => {
      const list = [...state.moyListOffline, payload];
      console.log('list', list);
      state.moyListOffline = list;
    },
    resetMoyListOffline: (state) => {
      state.moyListOffline = [];
    },
    removeMoyListsOffline: (state, { payload }) => {
      const filter = state.moyListOffline.filter((data: any) => data.id !== payload.id);
      console.log(filter);
      state.moyListOffline = filter;
    },
  },
});

export const {
  check,
  setMoyLists,
  setMoyListsOffline,
  removeMoyListsOffline,
  resetMoyListOffline,
} = appSlice.actions;
export default appSlice.reducer;
