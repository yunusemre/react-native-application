import { createSlice } from '@reduxjs/toolkit';
import { Login } from './app-service';

export interface AppStateType {
  isLogin?: boolean;
  username: string | null;
  token_type: string | null;
  access_token: string | null;
}

const initialState: AppStateType = {
  isLogin: false,
  username: null,
  token_type: null,
  access_token: null,
};

const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    check: (state) => {
      state.isLogin = !state.isLogin;
    },
    setToken: (state, action: any) => {
      console.log(action);
      state.access_token = action.payload.access_token;
      state.token_type = action.payload.token_type;
      state.username = action.payload.username;
    },
    resetToken: (state) => {
      state.access_token = null;
      state.token_type = null;
      state.username = null;
    },
    setLoginStatus: (state, { payload }) => {
      state.isLogin = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(Login.fulfilled, (state, action) => {
        state.isLogin = true;
        state.access_token = action.payload.access_token;
        state.token_type = action.payload.token_type;
        state.username = action.payload.username;
      })
      .addCase(Login.rejected, (state) => {
        state.isLogin = false;
      });
  },
});

export const { check, setToken, resetToken, setLoginStatus } = appSlice.actions;
export default appSlice.reducer;
