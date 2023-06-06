import { createSlice } from '@reduxjs/toolkit';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

const { height }: { height: number } = Dimensions.get('screen');

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
  screenHeight: 0, // bottombar: 70, actionbar: 52
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
    }
  },
});

export const { setLoginStatus, setLocations, setLayoutHeight } = appSlice.actions;
export default appSlice.reducer;
