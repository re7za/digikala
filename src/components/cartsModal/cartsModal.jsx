import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import TinyCart from "../../lib/tinyCart";
import Badge from "../../lib/badge";
import style from "../../assets/styles/components/cartsModal/style.module.scss";

const BoX_OPEN_DELAY = 200;
const BoX_CLOSE_DELAY = 800;

const CartsModal = (props) => {
  const { cartsInfo } = props;
  const cartsLen = cartsInfo.length;

  const [boxHoverTimeout, setBoxHoverTimeout] = useState();
  const [boxLeaveTimeout, setBoxLeaveTimeout] = useState();
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const handleBtnClick = () => {
    setIsBoxOpen(false);
  };

  const handleBtnHover = () => {
    clearTimeout(boxLeaveTimeout);
    if (boxHoverTimeout) clearTimeout(boxHoverTimeout);

    setBoxHoverTimeout(
      setTimeout(() => {
        setIsBoxOpen(true);
      }, BoX_OPEN_DELAY)
    );
  };

  const handleBtnLeave = () => {
    clearTimeout(boxHoverTimeout);
    if (boxLeaveTimeout) clearTimeout(boxLeaveTimeout);

    setBoxLeaveTimeout(
      setTimeout(() => {
        setIsBoxOpen(false);
      }, BoX_CLOSE_DELAY)
    );
  };

  return (
    <span
      className={style.cartsBtn}
      onClick={handleBtnClick}
      onMouseOver={handleBtnHover}
      onMouseLeave={handleBtnLeave}
    >
      <Link to="/carts" className={style.cartsLink}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartsLen !== 0 && (
          <span className={style.cartsLengthBadge}>
            <Badge color="red">{cartsLen}</Badge>
          </span>
        )}
      </Link>
      {cartsLen !== 0 && (
        <div className={`${style.cartsBox} ${!isBoxOpen && style.displayNone}`}>
          <div className={style.cartsBoxFirstRow}>
            <div className={style.cartsLenght}>{cartsLen} کالا</div>
            <Link to="/carts" className={style.cartsPageLink}>
              مشاهده سبد خرید
            </Link>
          </div>
          <div className={style.tinyCartsBox}>
            {cartsInfo.map(
              (cart, i) =>
                i < 3 && (
                  <div key={cart.id}>
                    <TinyCart id={cart.id} />
                  </div>
                )
            )}
          </div>
          {cartsLen > 3 && (
            <div className={style.cartsBoxLastRow}>
              <Link to="/carts" className={style.cartsPageLink}>
                مشاهده همه
              </Link>
            </div>
          )}
        </div>
      )}
    </span>
  );
};

const mapStateToProps = (state) => {
  return {
    cartsInfo: state.cartsReducer.cartsInfo,
  };
};

export default connect(mapStateToProps)(CartsModal);
