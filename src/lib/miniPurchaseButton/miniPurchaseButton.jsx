import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import QuickAddButton from "../quickAddButton";
import style from "../../assets/styles/lib/miniPurchaseButton/style.module.scss";

const MiniPurchaseButton = (props) => {
  const { isDisabled, onClick, quantity } = props;

  return (
    <div>
      {!isDisabled && (
        <QuickAddButton onClick={onClick}>
          <FontAwesomeIcon icon={faCartPlus} />
        </QuickAddButton>
      )}
      {quantity && <div className={style.quantity}>{quantity} عدد</div>}
    </div>
  );
};

MiniPurchaseButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
  quantity: PropTypes.any,
};

MiniPurchaseButton.defaultProps = {
  isDisabled: false,
  quantity: undefined,
};

export default MiniPurchaseButton;
