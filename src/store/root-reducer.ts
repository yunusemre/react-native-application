import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './features/app-slice';
import offlineSlice from './features/offline-slice';
import shipmentSlice from './features/shipment-slice';

const rootReducer = combineReducers({
  offline: offlineSlice,
  apps: appReducer,
  shipments: shipmentSlice,
});

export default rootReducer;
