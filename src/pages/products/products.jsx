import React from "react";

import { ProductsArea } from "../../components/productsArea";

import style from "../../assets/styles/pages/products/style.module.scss";

export const Products = () => {
  return (
    <div className={style.container}>
      {/* <aside className={style.aside}>aside</aside> */}
      <section className={style.section}>
        <ProductsArea />
      </section>
    </div>
  );
};
