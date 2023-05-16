import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  isLogin: boolean;
  name: string;
  token_type: string | null;
  access_token: string | null;
}

const initialState: AppStateType = {
  isLogin: false,
  name: 'Admin',
  token_type: null,
  access_token: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    check: (state) => {
      state.isLogin = !state.isLogin;
    },
    setToken: (state, { payload }) => {
      state.access_token = payload.access_token;
      state.token_type = payload.token_type;
    },
  },
});

export const { check, setToken } = appSlice.actions;
export default appSlice.reducer;
