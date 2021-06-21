import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { removeProductFromCarts } from "../../redux/actions/carts.actions";
import style from "../../assets/styles/lib/tinyCart/style.module.scss";

const TinyCart = (props) => {
  const { dispatch, id, title, imageUrl } = props;

  const handleRemoveFromCarts = (event) => {
    event.stopPropagation();
    dispatch(removeProductFromCarts(id));
  };

  return (
    <div className={style.tinyCart}>
      <Link to={`/product-details/${id}`} className={style.imageBox}>
        <img className={style.image} src={imageUrl} alt="کالا" />
      </Link>
      <div className={style.details}>
        <Link to={`/product-details/${id}`} className={style.title}>
          {title}
        </Link>
        <div className={style.secondRow}>
          <div className={style.quantity}>2 عدد</div>
          <button className={style.removeBtn} onClick={handleRemoveFromCarts}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

TinyCart.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    cartsIds: state.cartsReducer.cartsIds,
  };
};

export default connect(mapStateToProps)(TinyCart);
