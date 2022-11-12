import React from "react";
import { Provider } from "react-redux";
import Main from "./components/Main/Main";
import store from "./redux/redux-store";

function Init() {
 return (
  <React.StrictMode>
   <Provider store={store}>
    <Main />
   </Provider>
  </React.StrictMode>
 );
}

export default Init;
