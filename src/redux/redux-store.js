import { configureStore } from "@reduxjs/toolkit";
import initialState from "./preloaded/preloadedState";
import globReducer from "./reducers/glob-reducer";

let reducer = {
 global: globReducer,
};

const store = configureStore({reducer,
  preloadedState: initialState,
 });

export default store;
