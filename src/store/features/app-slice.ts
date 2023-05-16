import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  isLogin: boolean;
  username: string | null;
  token_type: string | null;
  access_token: string | null;
  location: {
    Latitude: number | null;
    Longitude: number | null;
  };
}

const initialState: AppStateType = {
  isLogin: false,
  username: null,
  token_type: null,
  access_token: null,
  location: {
    Latitude: null,
    Longitude: null,
  },
};

const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    check: (state) => {
      state.isLogin = !state.isLogin;
    },
    setToken: (state, { payload }) => {
      state.access_token = payload.access_token;
      state.token_type = payload.token_type;
      state.username = payload.username;
    },
    resetToken: (state) => {
      state.access_token = null;
      state.token_type = null;
      state.username = null;
    },
    setFirstLocation: (state, { payload }: any) => {
      state.location.Longitude = payload.longitude;
      state.location.Latitude = payload.latitude;
    },
  },
});

export const { check, setToken, resetToken, setFirstLocation } = appSlice.actions;
export default appSlice.reducer;
