import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextButton from "../textButton";
import { handleTextLength } from "../../helpers/text-utils";
import { productsServices } from "../../services/products.service";
import { removeProductFromCarts } from "../../redux/actions/carts.actions";

import style from "../../assets/styles/lib/tinyCart/style.module.scss";

const TinyCart = (props) => {
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

  const handleRemoveFromCarts = (event) => {
    event.stopPropagation();
    dispatch(removeProductFromCarts(id));
  };

  return (
    <>
      {product && (
        <div className={style.tinyCart}>
          <Link to={`/product-details/${id}`} className={style.imageBox}>
            <img
              className={style.image}
              src={product?.images?.main}
              alt="کالا"
            />
          </Link>
          <div className={style.details}>
            <Link to={`/product-details/${id}`} className={style.title}>
              {handleTextLength(product?.title, 40)}
            </Link>
            <div className={style.secondRow}>
              <div className={style.quantity}>{cart?.quantity} عدد</div>
              <TextButton onClick={handleRemoveFromCarts}>حذف</TextButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

TinyCart.propTypes = {
  id: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    cartsInfo: state.cartsReducer.cartsInfo,
  };
};

export default React.memo(connect(mapStateToProps)(TinyCart));
