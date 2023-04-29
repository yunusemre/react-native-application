import { combineReducers } from "@reduxjs/toolkit";
import { reducer as network } from "react-native-offline";
import appReducer from "./features/app-slice";

const rootReducer = combineReducers({
  network,
  app: appReducer,
});

export default rootReducer;
