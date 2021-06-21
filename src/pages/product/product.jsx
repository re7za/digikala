import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { addProductToCarts } from "../../redux/actions/carts.actions";
import { productsServices } from "../../services/products.service";

import { Badge } from "../../lib/badge";
import { Button } from "../../lib/‌‌‌button";
import Loader from "../../lib/loader";
import style from "../../assets/styles/pages/product/style.module.scss";

const Product = (props) => {
  const { dispatch, cartsInfo } = props;

  const [product, setProduct] = useState();

  const { id } = useParams();
  const productId = Number(id);

  const isCartExistInCarts = cartsInfo.find(
    (cart) => Number(cart.id) === productId
  );

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await productsServices.fetchProductById(productId);
    setProduct(res?.product);
  };

  const discount = () =>
    Math.round(
      100 - (product?.price.selling_price / product?.price.rrp_price) * 100
    );

  const addButtonLabel = () => {
    if (isCartExistInCarts) {
      return "به سبد خرید اضافه شد";
    }
    if (product?.status === "marketable") {
      return "افزودن به سبد خرید";
    }
    return "موجود شد به من اطلاع بده";
  };

  const handleAddToCarts = () => {
    if (product?.status !== "marketable") {
      console.log("Handle alert in a real project");
      return;
    }
    if (!isCartExistInCarts) dispatch(addProductToCarts(productId));
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
                    product?.status === "marketable"
                      ? style.statusAvailable
                      : style.StatusUnavailable
                  }
                >
                  {product?.status === "marketable" ? "آماده ارسال" : "ناموجود"}
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
              {product?.price.rrp_price && (
                <div>
                  <Badge color="red">{discount()}%</Badge>
                  <span className={style.rrpPrice}>
                    {product?.price.rrp_price.toLocaleString("en-US")}
                  </span>
                </div>
              )}
            </div>
            <div>
              <Button disabled={isCartExistInCarts} onClick={handleAddToCarts}>
                {addButtonLabel()}
              </Button>
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
