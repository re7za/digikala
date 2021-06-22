import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import { addProductToCarts } from "../../redux/actions/carts.actions";
import { handleTextLength } from "../../helpers/text-utils";
import { Badge } from "../badge";
import { QuickAddButton } from "../quickAddButton";
import style from "../../assets/styles/lib/productCard/style.module.scss";

const ProductCard = (props) => {
  const { dispatch, cartsInfo, id, title, status, images, price } = props;
  const cart = cartsInfo.find((cart) => Number(cart.id) === Number(id));

  const discount = () =>
    Math.round(100 - (price.selling_price / price.rrp_price) * 100);

  const handleAddToCarts = (event) => {
    event.stopPropagation();
    dispatch(addProductToCarts(id));
  };

  return (
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
          </Link>
          <div>
            {status === "marketable" && (
              <QuickAddButton onClick={handleAddToCarts}>
                <FontAwesomeIcon icon={faCartPlus} />
              </QuickAddButton>
            )}
            {cart?.quantity && (
              <div className={style.quantity}>{cart.quantity} عدد</div>
            )}
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
  price: PropTypes.object,
};

ProductCard.defaultProps = {
  status: "",
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

export default connect(mapStateToProps)(ProductCard);
