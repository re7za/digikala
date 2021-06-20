import "@fontsource/roboto";
import "./assets/styles/general.scss";

import React from "react";
import { Router, Route, Redirect } from "react-router-dom";

import { history } from "./helpers";

import { Products } from "./pages/products";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";

const App = () => {
  return (
    <div>
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
        <Route path="/cart" component={Cart} />
      </Router>
    </div>
  );
};

export default App;
