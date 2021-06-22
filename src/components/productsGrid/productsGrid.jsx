import React from "react";
import PropTypes from "prop-types";

import ProductCard from "../../lib/productCard";
import style from "../../assets/styles/components/productsGrid/style.module.scss";

const ProductsGrid = (props) => {
  const { products } = props;

  return (
    <div className={style.grid}>
      {products?.map((product) => (
        <React.Fragment key={product.id}>
          <ProductCard {...product} />
        </React.Fragment>
      ))}
    </div>
  );
};

ProductsGrid.propTypes = {
  products: PropTypes.array,
};

export default ProductsGrid;
