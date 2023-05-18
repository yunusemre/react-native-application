import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  data: any[];
  loading: boolean;
}

const initialState: AppStateType = {
  data: [],
  loading: true,
};

const ShipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setShipmentsData: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    },
  },
});
export const { setShipmentsData } = ShipmentsSlice.actions;
export default ShipmentsSlice.reducer;
