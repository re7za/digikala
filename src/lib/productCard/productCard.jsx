import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Badge } from "../badge";
import style from "../../assets/styles/lib/productCard/style.module.scss";

export const ProductCard = (props) => {
  const { id, title, images, price } = props;

  const discount = () =>
    Math.round(100 - (price.selling_price / price.rrp_price) * 100);

  return (
    <Link to={`/product-details/${id}`}>
      <div className={style.card}>
        <div className={style.imageBox}>
          <img className={style.image} src={images.main} alt="کالا" />
        </div>
        <div className={style.info}>
          <div className={style.title}>{title}</div>
          {price.rrp_price && (
            <div>
              <Badge color="red">{discount()}%</Badge>
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
    </Link>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number,
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
