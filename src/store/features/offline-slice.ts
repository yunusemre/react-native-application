import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  moyListOffline: any[];
}

const initialState: AppStateType = {
  moyListOffline: [],
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setMoyListsOffline: (state, { payload }) => {
      const list = [...state.moyListOffline, payload];
      state.moyListOffline = list;
    },
    resetMoyListOffline: (state) => {
      state.moyListOffline = [];
    },
    removeMoyListsOffline: (state, { payload }) => {
      const filter = state.moyListOffline.filter((data: any) => data.id !== payload.id);
      state.moyListOffline = filter;
    },
  },
});

export const { setMoyListsOffline, removeMoyListsOffline, resetMoyListOffline } =
  offlineSlice.actions;
export default offlineSlice.reducer;
