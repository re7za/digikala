import React from "react";
import PropTypes from "prop-types";

import Badge from "../badge";

import style from "../../assets/styles/lib/discount/style.module.scss";

const Discount = (props) => {
  const { rrpPrice, sellingPrice } = props;

  const discount = Math.round(100 - (sellingPrice / rrpPrice) * 100);

  return (
    <span>
      {discount !== 0 && (
        <>
          <Badge color="red">{discount}%</Badge>
          <span className={style.rrpPrice}>
            {rrpPrice.toLocaleString("en-US")}
          </span>
        </>
      )}
    </span>
  );
};

Discount.propTypes = {
  rrpPrice: PropTypes.number,
  sellingPrice: PropTypes.number,
};

Discount.defaultProps = {
  rrpPrice: 0,
  sellingPrice: 0,
};

export default Discount;
