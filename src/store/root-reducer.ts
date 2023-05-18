import { combineReducers } from '@reduxjs/toolkit';
import { reducer as network } from 'react-native-offline';
import appReducer from './features/app-slice';
import offlineSlice from './features/offline-slice';
import shipmentSlice from './features/shipment-slice';

const rootReducer = combineReducers({
  network,
  offline: offlineSlice,
  apps: appReducer,
  shipments: shipmentSlice,
});

export default rootReducer;
