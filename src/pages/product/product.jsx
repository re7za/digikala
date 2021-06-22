import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import {
  addProductToCarts,
  reduceProductFromCarts,
} from "../../redux/actions/carts.actions";
import { productsServices } from "../../services/products.service";

import { Badge } from "../../lib/badge";
import { Button } from "../../lib/‌‌‌button";
import CounterButtons from "../../lib/counterButtons";
import Loader from "../../lib/loader";

import style from "../../assets/styles/pages/product/style.module.scss";

const Product = (props) => {
  const { dispatch, cartsInfo } = props;

  const { id } = useParams();
  const productId = Number(id);
  const cart = cartsInfo.find((cart) => Number(cart.id) === productId);

  const [product, setProduct] = useState();

  const discount = Math.round(
    100 - (product?.price.selling_price / product?.price.rrp_price) * 100
  );
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
                <span className={style.star}>
                  <FontAwesomeIcon icon={faStar} />
                </span>{" "}
                <span className={style.rate}>{product?.rating.rate / 10}</span>{" "}
                <span className={style.count}>({product?.rating.count})</span>
              </div>
              <div className={style.status}>
                وضعیت :‌{" "}
                <span
                  className={
                    isMarketable
                      ? style.statusAvailable
                      : style.StatusUnavailable
                  }
                >
                  {isMarketable ? "آماده ارسال" : "ناموجود"}
                </span>
              </div>
            </div>
            <div className={style.price}>
              <div className={style.sellingPriceBox}>
                <span className={style.sellingPrice}>
                  {product?.price.selling_price.toLocaleString("en-US")}
                </span>
                <span> تــــومان</span>
              </div>
              {discount !== 0 && (
                <div>
                  <Badge color="red">{discount}%</Badge>
                  <span className={style.rrpPrice}>
                    {product?.price.rrp_price.toLocaleString("en-US")}
                  </span>
                </div>
              )}
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
