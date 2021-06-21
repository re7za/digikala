import React from "react";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { addProductToCarts } from "../../redux/actions/carts.actions";

import { Badge } from "../../lib/badge";
import { Button } from "../../lib/‌‌‌button";
import { products } from "../../services/mock";
import style from "../../assets/styles/pages/product/style.module.scss";

const Product = (props) => {
  const { dispatch, cartsIds } = props;

  const { id } = useParams();
  const productId = Number(id);

  let product;
  for (let item of products) {
    if (item.id !== productId) continue;

    product = item;
    break;
  }

  const { title, images, rating, status, price } = product;
  const isCartExistInCarts = cartsIds.includes(productId);

  const discount = () =>
    Math.round(100 - (price.selling_price / price.rrp_price) * 100);

  const addButtonLabel = () => {
    if (isCartExistInCarts) {
      return "به سبد خرید اضافه شد";
    }
    if (status === "marketable") {
      return "افزودن به سبد خرید";
    }
    return "موجود شد به من اطلاع بده";
  };

  const handleAddToCarts = () => {
    if (status !== "marketable") {
      console.log("Handle alert in a real project");
      return;
    }
    if (!isCartExistInCarts) dispatch(addProductToCarts(productId));
  };

  return (
    <div>
      <Link to={`/carts`}>سبد خرید</Link>
      {product ? (
        <div className={style.product}>
          <div className={style.imageBox}>
            <img className={style.image} src={images.main} alt="کالا" />
          </div>
          <div className={style.details}>
            <h3 className={style.title}>{title}</h3>
            <div className={style.rowInMobile}>
              <div className={style.rating}>
                <span className={style.star}>
                  <FontAwesomeIcon icon={faStar} />
                </span>{" "}
                <span className={style.rate}>{rating.rate / 10}</span>{" "}
                <span className={style.count}>({rating.count})</span>
              </div>
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
            </div>
            <div className={style.price}>
              <div className={style.sellingPriceBox}>
                <span className={style.sellingPrice}>
                  {price.selling_price.toLocaleString("en-US")}
                </span>
                <span> تــــومان</span>
              </div>
              {price.rrp_price && (
                <div>
                  <Badge color="red">{discount()}%</Badge>
                  <span className={style.rrpPrice}>
                    {price.rrp_price.toLocaleString("en-US")}
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
        <div>404 Not Found</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartsIds: state.cartsReducer.cartsIds,
  };
};

export default connect(mapStateToProps)(Product);
