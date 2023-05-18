import { createSlice } from '@reduxjs/toolkit';

export interface AppStateType {
  data: any[];
  loading: boolean;
}

const initialState: AppStateType = {
  data: [],
  loading: false,
};

const ShipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setShipments: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setShipments } = ShipmentsSlice.actions;
export default ShipmentsSlice.reducer;
