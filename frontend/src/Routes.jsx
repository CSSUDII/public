import React from "react";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import Nav from "./Nav/nav";

const authGuard = (Component) => () => {
  return localStorage.getItem("token") ? (
    <Component />
  ) : (
    <Redirect to="/login" />
  );
};


const Routes = (props) => (
<div>
  <Nav/>
<Router {...props}>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
</div>
);

export default Routes;
