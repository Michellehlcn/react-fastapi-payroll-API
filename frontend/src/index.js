import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";
//import { UserProvider } from "./context/UserContext";

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.getElementById("root")
);
