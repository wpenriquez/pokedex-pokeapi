import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles/css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
