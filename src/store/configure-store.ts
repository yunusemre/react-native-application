import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './root-reducer';

const persistConfig = {
  key: 'kolaygelsin',
  storage: AsyncStorage,
  timeout: 0,
  whitelist: ['apps', 'shipments'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
