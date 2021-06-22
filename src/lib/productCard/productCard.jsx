import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addProductToCarts } from "../../redux/actions/carts.actions";
import { handleTextLength } from "../../helpers/text-utils";

import Discount from "../discount";
import SellingPrice from "../sellingPrice";
import MiniPurchaseButton from "../miniPurchaseButton";

import style from "../../assets/styles/lib/productCard/style.module.scss";

const ProductCard = (props) => {
  const { dispatch, cartQuantity, id, title, status, images, price } = props;

  const handleAddToCarts = (event) => {
    event.stopPropagation();
    dispatch(addProductToCarts(id));
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.card}>
        <Link to={`/product-details/${id}`}>
          <div className={style.imageBox}>
            <img className={style.image} src={images.main} alt="کالا" />
          </div>
        </Link>
        <div className={style.info}>
          <Link to={`/product-details/${id}`}>
            <div className={style.title}>{handleTextLength(title, 40)}</div>
          </Link>
          <div className={style.purchase}>
            <Link to={`/product-details/${id}`} className={style.price}>
              <Discount
                rrpPrice={price.rrp_price}
                sellingPrice={price.selling_price}
              />
              <SellingPrice sellingPrice={price.selling_price} />
            </Link>
            <MiniPurchaseButton
              isDisabled={status !== "marketable"}
              onClick={handleAddToCarts}
              quantity={cartQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  status: PropTypes.string,
  images: PropTypes.object,
};

ProductCard.defaultProps = {
  status: "",
  images: {
    main: "",
  },
};

const mapStateToProps = (state, props) => {
  return {
    // To avoid additional rerenderings
    cartQuantity: state.cartsReducer.cartsInfo.find(
      (cart) => Number(cart.id) === Number(props.id)
    )?.quantity,
  };
};

export default React.memo(connect(mapStateToProps)(ProductCard));
