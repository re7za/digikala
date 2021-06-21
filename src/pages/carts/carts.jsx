import React from "react";
import { connect } from "react-redux";

import { removeAllCarts } from "../../redux/actions/carts.actions";
import Cart from "../../lib/cart";
import { products } from "../../services/mock";
import style from "../../assets/styles/pages/carts/style.module.scss";

const Carts = (props) => {
  const { dispatch, cartsIds } = props;
  const carts = products.filter((product) => cartsIds.includes(product.id));

  const handleDeleteAllCarts = () => {
    localStorage.removeItem("carts");
    dispatch(removeAllCarts());
  };

  return (
    <div className={style.carts}>
      {carts.length ? (
        <>
          <button className={style.deleteAllBtn} onClick={handleDeleteAllCarts}>
            پاک کردن همه
          </button>
          <div className={style.grid}>
            {carts.map((product) => (
              <div key={product.id}>
                <Cart {...product} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Empty list!</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartsIds: state.cartsReducer.cartsIds,
  };
};

export default connect(mapStateToProps)(Carts);
