import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./store";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {routes} from "./router";
import "./css/output.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={routes} />
    </Provider>
);
