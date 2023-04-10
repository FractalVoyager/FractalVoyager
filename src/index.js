import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

/*
Entry point to app, renders App component on the "root", empty div in index.html
*/
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
