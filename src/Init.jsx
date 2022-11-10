import React from "react";
import { Provider } from "react-redux";
import Main from "./components/Main/Main";
import store from "./redux/redux-store";

function Init() {
 return (
  <Provider store={store}>
   <Main />
  </Provider>
 );
}

export default Init;
