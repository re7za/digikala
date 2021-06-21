import React from "react";
import { Router, Route, Redirect } from "react-router-dom";

import Header from "./components/header";
import Product from "./pages/product";
import Carts from "./pages/carts";
import { history } from "./helpers";
import { Products } from "./pages/products";

import style from "./assets/styles/app.module.scss";

import "@fontsource/roboto";

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <div className={style.root}>
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
      </div>
    </Router>
  );
};

export default App;
