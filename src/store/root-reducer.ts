import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './features/app-slice';
import offlineSlice from './features/offline-slice';

const rootReducer = combineReducers({
  offline: offlineSlice,
  app: appReducer,
});

export default rootReducer;
