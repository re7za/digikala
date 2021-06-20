import React from "react";

import { ProductsArea } from "../../components/productsArea";
// import { productsServices } from "../../services/products.service";

import style from "../../assets/styles/pages/products/style.module.scss";

export const Products = () => {
  return (
    <>
      {/* <button onClick={() => productsServices.getProducts()}>fetch</button> */}
      <div className={style.container}>
        <aside className={style.aside}>aside</aside>
        <section className={style.section}>
          <ProductsArea />
        </section>
      </div>
    </>
  );
};
