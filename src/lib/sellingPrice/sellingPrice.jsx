import React from "react";
import PropTypes from "prop-types";

import style from "../../assets/styles/lib/sellingPrice/style.module.scss";

const SellingPrice = (props) => {
  const { sellingPrice } = props;

  return (
    <div className={style.sellingPriceBox}>
      <span className={style.sellingPrice}>
        {sellingPrice.toLocaleString("en-US")}
      </span>
      <span> تــــومان</span>
    </div>
  );
};

SellingPrice.propTypes = {
  sellingPrice: PropTypes.number,
};

SellingPrice.defaultProps = {
  sellingPrice: 0,
};

export default SellingPrice;
