import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { removeProductFromCarts } from "../../redux/actions/carts.actions";
import { productsServices } from "../../services/products.service";

import style from "../../assets/styles/lib/cart/style.module.scss";

const Cart = (props) => {
  const { dispatch, cartsInfo, id } = props;
  const cart = cartsInfo.find((cart) => Number(cart.id) === Number(id));

  const [product, setProduct] = useState();

  const discount = product?.price.rrp_price - product?.price.selling_price;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await productsServices.fetchProductById(id);
    setProduct(res?.product);
  };

  const handleRemoveFromCarts = () => {
    dispatch(removeProductFromCarts(id));
  };

  return (
    <div className={style.product}>
      <Link to={`/product-details/${id}`} className={style.imageBox}>
        <img className={style.image} src={product?.images.main} alt="کالا" />
      </Link>
      <div className={style.details}>
        <Link to={`/product-details/${id}`}>
          <h3 className={style.title}>{product?.title}</h3>
        </Link>
        <div className={style.status}>
          وضعیت :‌{" "}
          <span
            className={
              product?.status === "marketable"
                ? style.statusAvailable
                : style.StatusUnavailable
            }
          >
            {product?.status === "marketable" ? "آماده ارسال" : "ناموجود"}
          </span>
        </div>
        <div className={style.price}>
          {discount !== 0 && (
            <div>
              <span className={style.rrpPrice}>
                تخفیف {discount.toLocaleString("en-US")} تومان
              </span>
            </div>
          )}
          <div className={style.sellingPriceBox}>
            <span className={style.sellingPrice}>
              {product?.price.selling_price.toLocaleString("en-US")}
            </span>
            <span> تــــومان</span>
          </div>
        </div>
        <div className={style.quantity}>
          <div>{cart.quantity} عدد</div>
          <button className={style.removeBtn} onClick={handleRemoveFromCarts}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  id: PropTypes.number,
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

const mapStateToProps = (state) => {
  return {
    cartsInfo: state.cartsReducer.cartsInfo,
  };
};

export default connect(mapStateToProps)(Cart);
