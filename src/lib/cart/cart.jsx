import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CounterButtons from "../counterButtons";
import Loader from "../loader";
import Discount from "../discount";
import Status from "../status";
import SellingPrice from "../sellingPrice";
import TextButton from "../textButton";
import { handleTextLength } from "../../helpers/text-utils";
import { productsServices } from "../../services/products.service";
import {
  removeProductFromCarts,
  addProductToCarts,
  reduceProductFromCarts,
} from "../../redux/actions/carts.actions";

import style from "../../assets/styles/lib/cart/style.module.scss";

const Cart = (props) => {
  const { dispatch, cartsInfo, id } = props;
  const cart = cartsInfo.find((cart) => Number(cart.id) === Number(id));

  const [product, setProduct] = useState();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await productsServices.fetchProductById(id);
    setProduct(res?.product);
  };

  const handleAddToCarts = () => {
    dispatch(addProductToCarts(id));
  };

  const handleRemoveFromCarts = () => {
    dispatch(removeProductFromCarts(id));
  };

  const handleReduceFromCarts = () => {
    dispatch(reduceProductFromCarts(id));
  };

  return (
    <>
      {product ? (
        <div className={style.product}>
          <Link to={`/product-details/${id}`} className={style.imageBox}>
            <img
              className={style.image}
              src={product?.images.main}
              alt="کالا"
            />
          </Link>
          <div className={style.details}>
            <Link to={`/product-details/${id}`}>
              <h3 className={style.title}>
                {handleTextLength(product?.title, 50)}
              </h3>
            </Link>
            <div className={style.status}>
              <Status isMarketable={product?.status === "marketable"} />
            </div>
            <div className={style.price}>
              <Discount
                rrpPrice={product?.price.rrp_price}
                sellingPrice={product?.price.selling_price}
              />
              <SellingPrice sellingPrice={product?.price.selling_price} />
            </div>
            <div className={style.quantity}>
              <CounterButtons
                onDecrease={handleReduceFromCarts}
                onIncrease={handleAddToCarts}
                counter={cart?.quantity}
              />
              <TextButton onClick={handleRemoveFromCarts}>حذف</TextButton>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
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
