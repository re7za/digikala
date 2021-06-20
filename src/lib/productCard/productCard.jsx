import React from "react";
import PropTypes from "prop-types";

import { Badge } from "../badge";
import style from "../../assets/styles/lib/productCard/style.module.scss";

export const ProductCard = (props) => {
  const { title, images, price } = props;

  const calcDiscount = () =>
    Math.round(100 - (price.selling_price / price.rrp_price) * 100);

  return (
    <div className={style.card}>
      <div className={style.imageBox}>
        <img
          className={style.image}
          //   style={{ width: "150px", height: "150px", objectFit: "contain" }}
          src={images.main}
          alt="کالا"
        />
      </div>
      <div className={style.info}>
        <div className={style.title}>{title}</div>
        {price.rrp_price && (
          <div>
            <Badge color="red">{calcDiscount()}%</Badge>
            <span className={style.rrpPrice}>
              {price.rrp_price.toLocaleString("en-US")}
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
    </div>
  );
};

ProductCard.propTypes = {
  //   id: PropTypes.number,
  title: PropTypes.string.isRequired,
  //   rating: PropTypes.object,
  //   status: PropTypes.string,
  images: PropTypes.object,
  price: PropTypes.object,
};

ProductCard.defaultProps = {
  //   rating: {
  //     rate: 0,
  //     count: 0,
  //   },
  images: {
    main: "",
  },
  price: {
    selling_price: 0,
    rrp_price: 0,
  },
};
