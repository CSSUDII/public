import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";

import "./index.css";
import * as serviceWorker from "./serviceWorker";

import Routes from "./Routes";

ReactDOM.render(<Routes />, document.getElementById("root"));

serviceWorker.unregister();
