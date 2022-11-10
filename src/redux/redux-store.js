import { configureStore } from "@reduxjs/toolkit";
import globReducer from "./reducers/glob-reducer";

let reducer = {
 global: globReducer,
};

const store = configureStore({reducer,
 devTools: process.env.NODE_ENV !== 'production'});

export default store;
