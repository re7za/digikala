import React, { useState, useEffect } from "react";

import { productsServices } from "../../services/products.service";
import { ProductsGrid } from "../productsGrid";
import Loader from "../../lib/loader";

import style from "../../assets/styles/components/productsArea/style.module.scss";

export const ProductsArea = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await productsServices.fetchProducts();
    setProducts(res?.products);
  };

  return (
    <div>
      {products.length ? (
        <div className={style.productsGrid}>
          <ProductsGrid products={products} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
