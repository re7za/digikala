import "@fontsource/roboto";
import "./assets/styles/general.scss";

import React from "react";
import { Router, Route, Redirect } from "react-router-dom";

import { history } from "./helpers";

import { Products } from "./pages/products";
import Product from "./pages/product";
import Carts from "./pages/carts";
import style from "./assets/styles/app.module.scss";

const App = () => {
  return (
    <div className={style.root}>
      <Router history={history}>
        <Route
          exact
          path="/"
          component={() => (
            <Redirect
              to={{
                pathname: "/products-list",
              }}
            />
          )}
        />
        <Route path="/products-list" component={Products} />
        <Route path="/product-details/:id" component={Product} />
        <Route path="/carts" component={Carts} />
      </Router>
    </div>
  );
};

export default App;
