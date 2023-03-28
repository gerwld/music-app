import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/redux-store";
import App from "./App";
import "./styles/main.css";
import "./styles/media.css";

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
  <Provider store={store}>
   <App />
  </Provider>
 </React.StrictMode>
);
