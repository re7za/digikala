import React from "react";

import { Cart } from "../../lib/cart";
import { products } from "../../services/mock";
import style from "../../assets/styles/pages/carts/style.module.scss";

export const Carts = () => {
  const handleDeleteAllCarts = () => {
    localStorage.removeItem("carts");
  };

  return (
    <div className={style.carts}>
      <button className={style.deleteAllBtn} onClick={handleDeleteAllCarts}>
        پاک کردن همه
      </button>
      <div className={style.grid}>
        {products.map((product) => (
          <div key={product.id}>
            <Cart {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};
