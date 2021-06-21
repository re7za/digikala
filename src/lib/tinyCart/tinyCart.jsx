import React from "react";
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
      <div className={style.imageBox}>
        <img className={style.image} src={imageUrl} alt="کالا" />
      </div>
      <div className={style.details}>
        <div className={style.title}>{title}</div>
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
