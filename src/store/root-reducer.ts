import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './features/app-slice';
import offlineSlice from './features/offline-slice';

const rootReducer = combineReducers({
  offline: offlineSlice,
  apps: appReducer,
});

export default rootReducer;
