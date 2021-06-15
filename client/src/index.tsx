import React from "react";
import ReactDOM from "react-dom";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import Alert from "./components/layout/Alert";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "15px",
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <AlertProvider template={Alert} {...options}>
        <BrowserRouter>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </BrowserRouter>
      </AlertProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
