import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router.jsx";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store, persistor} from "./store/store.js";
import React from "react";
import { PersistGate } from 'redux-persist/integration/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router}/>
          </PersistGate>
        </Provider>
    </React.StrictMode>
);
