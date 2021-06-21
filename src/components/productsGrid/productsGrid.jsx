import React from "react";

import ProductCard from "../../lib/productCard";

import { products } from "../../services/mock";
import style from "../../assets/styles/components/productsGrid/style.module.scss";

export const ProductsGrid = () => {
  return (
    <div className={style.grid}>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};
