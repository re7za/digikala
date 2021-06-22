import React from "react";
import PropTypes from "prop-types";

import Badge from "../badge";

import style from "../../assets/styles/lib/discount/style.module.scss";

const Discount = (props) => {
  const { rrp_price, selling_price } = props;

  const discount = Math.round(100 - (selling_price / rrp_price) * 100);

  return (
    <div>
      {discount !== 0 && (
        <>
          <Badge color="red">{discount}%</Badge>
          <span className={style.rrpPrice}>
            {rrp_price.toLocaleString("en-US")}
          </span>
        </>
      )}
    </div>
  );
};

Discount.propTypes = {
  rrp_price: PropTypes.number,
  selling_price: PropTypes.number,
};

Discount.defaultProps = {
  rrp_price: 0,
  selling_price: 0,
};

export default Discount;
