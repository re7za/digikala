import React, { useState, useEffect } from "react";

import { productsServices } from "../../services/products.service";
import { ProductsGrid } from "../productsGrid";

export const ProductsArea = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await productsServices.fetchProducts();
    setProducts(res.products);
  };

  return (
    <div>
      <ProductsGrid products={products} />
    </div>
  );
};
