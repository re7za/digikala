import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import {
  addProductToCarts,
  reduceProductFromCarts,
} from "../../redux/actions/carts.actions";
import { productsServices } from "../../services/products.service";

import Button from "../../lib/‌‌‌button";
import CounterButtons from "../../lib/counterButtons";
import Loader from "../../lib/loader";
import Discount from "../../lib/discount";
import Status from "../../lib/status";
import Rating from "../../lib/rating";
import SellingPrice from "../../lib/sellingPrice";

import style from "../../assets/styles/pages/product/style.module.scss";

const Product = (props) => {
  const { dispatch, cartsInfo } = props;

  const { id } = useParams();
  const productId = Number(id);
  const cart = cartsInfo.find((cart) => Number(cart.id) === productId);

  const [product, setProduct] = useState();

  const isMarketable = product?.status === "marketable";
  const addButtonLabel = isMarketable
    ? "افزودن به سبد خرید"
    : "موجود شد به من اطلاع بده";

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await productsServices.fetchProductById(productId);
    setProduct(res?.product);
  };

  const handleAddToCarts = () => {
    if (!isMarketable) {
      console.log("Handle alert in a real project");
      return;
    }
    dispatch(addProductToCarts(productId));
  };

  const handleReduceFromCarts = () => {
    dispatch(reduceProductFromCarts(productId));
  };

  return (
    <div className={style.productRoot}>
      {product ? (
        <div className={style.product}>
          <div className={style.imageBox}>
            <img
              className={style.image}
              src={product?.images.main}
              alt="کالا"
            />
          </div>
          <div className={style.details}>
            <h3 className={style.title}>{product?.title}</h3>
            <div className={style.rowInMobile}>
              <div className={style.rating}>
                <Rating
                  rate={product?.rating.rate / 10}
                  count={product?.rating.count}
                />
              </div>
              <Status isMarketable={isMarketable} />
            </div>
            <div className={style.price}>
              <SellingPrice sellingPrice={product?.price.selling_price} />
              <Discount
                rrpPrice={product?.price.rrp_price}
                sellingPrice={product?.price.selling_price}
              />
            </div>
            <div>
              {cart ? (
                <CounterButtons
                  onDecrease={handleReduceFromCarts}
                  onIncrease={handleAddToCarts}
                  counter={cart?.quantity}
                />
              ) : (
                <Button disabled={!isMarketable} onClick={handleAddToCarts}>
                  {addButtonLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartsInfo: state.cartsReducer.cartsInfo,
  };
};

export default connect(mapStateToProps)(Product);
