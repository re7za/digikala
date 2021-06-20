import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../../lib/‌‌‌button";
import PropTypes from "prop-types";

import style from "../../assets/styles/lib/cart/style.module.scss";

export const Cart = (props) => {
  const { id, title, images, status, price } = props;

  const discount = () => price.rrp_price - price.selling_price;

  return (
    <div className={style.product}>
      <Link to={`/product-details/${id}`} className={style.imageBox}>
        <img className={style.image} src={images.main} alt="کالا" />
      </Link>
      <div className={style.details}>
        <Link to={`/product-details/${id}`}>
          <h3 className={style.title}>{title}</h3>
        </Link>
        <div className={style.status}>
          وضعیت :‌{" "}
          <span
            className={
              status === "marketable"
                ? style.statusAvailable
                : style.StatusUnavailable
            }
          >
            {status === "marketable" ? "آماده ارسال" : "ناموجود"}
          </span>
        </div>
        <div className={style.price}>
          {price.rrp_price && (
            <div>
              <span className={style.rrpPrice}>
                تخفیف {discount().toLocaleString("en-US")} تومان
              </span>
            </div>
          )}
          <div className={style.sellingPriceBox}>
            <span className={style.sellingPrice}>
              {price.selling_price.toLocaleString("en-US")}
            </span>
            <span> تــــومان</span>
          </div>
        </div>
        <button className={style.deleteBtn}>حذف</button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  status: PropTypes.string,
  images: PropTypes.object,
  price: PropTypes.object,
};

Cart.defaultProps = {
  images: {
    main: "",
  },
  price: {
    selling_price: 0,
    rrp_price: 0,
  },
};
