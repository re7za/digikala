import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import TinyCart from "../../lib/tinyCart";
import { Badge } from "../../lib/badge";
import { products } from "../../services/mock";
import style from "../../assets/styles/components/cartsModal/style.module.scss";

const BoX_OPEN_DELAY = 200;
const BoX_CLOSE_DELAY = 800;

const CartsModal = (props) => {
  const { cartsInfo } = props;
  const carts = products.filter((product) =>
    cartsInfo.find((cart) => Number(cart.id) === Number(product.id))
  );

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
        {carts.length !== 0 && (
          <span className={style.cartsLengthBadge}>
            <Badge color="red">{carts.length}</Badge>
          </span>
        )}
      </Link>
      {isBoxOpen && carts.length !== 0 && (
        <div className={style.cartsBox}>
          <div className={style.cartsBoxFirstRow}>
            <div className={style.cartsLenght}>{carts.length} کالا</div>
            <Link to="/carts" className={style.cartsPageLink}>
              مشاهده سبد خرید
            </Link>
          </div>
          <div className={style.tinyCartsBox}>
            {carts.map(
              (cart, i) =>
                i < 3 && (
                  <div key={cart.id}>
                    <TinyCart
                      id={cart.id}
                      title={cart.title}
                      imageUrl={cart.images.main}
                    />
                  </div>
                )
            )}
          </div>
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
