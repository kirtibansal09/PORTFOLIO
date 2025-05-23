import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";

import { ToastContainer } from 'react-toastify';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer position="bottom-center" />
        <App />
  
    </Provider>
  </React.StrictMode>
);
