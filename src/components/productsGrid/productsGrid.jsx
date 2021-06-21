import React from "react";
import PropTypes from "prop-types";

import ProductCard from "../../lib/productCard";
import style from "../../assets/styles/components/productsGrid/style.module.scss";

export const ProductsGrid = (props) => {
  const { products } = props;

  return (
    <div className={style.grid}>
      {products?.map((product) => (
        <div key={product.id}>
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
};

ProductsGrid.propTypes = {
  products: PropTypes.array,
};
