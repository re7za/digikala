import React from "react";
import { connect } from "react-redux";

import { removeAllCarts } from "../../redux/actions/carts.actions";
import Cart from "../../lib/cart";
import style from "../../assets/styles/pages/carts/style.module.scss";

const Carts = (props) => {
  const { dispatch, cartsInfo } = props;
  const cartsLen = cartsInfo.length;

  const handleDeleteAllCarts = () => {
    localStorage.removeItem("carts");
    dispatch(removeAllCarts());
  };

  return (
    <div className={style.carts}>
      {cartsLen ? (
        <>
          <button className={style.deleteAllBtn} onClick={handleDeleteAllCarts}>
            پاک کردن همه
          </button>
          <div className={style.grid}>
            {cartsInfo.map((cart) => (
              <div key={cart.id}>
                <Cart id={cart.id} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={style.emptyList}>
          هیچ کالایی در سبد خرید موجود نیست!
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartsInfo: state.cartsReducer.cartsInfo,
  };
};

export default connect(mapStateToProps)(Carts);
