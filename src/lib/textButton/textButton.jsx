import React from "react";
import PropTypes from "prop-types";

import style from "../../assets/styles/lib/textButton/style.module.scss";

const TextButton = (props) => {
  const { onClick, children } = props;

  return (
    <button className={style.textButton} onClick={onClick}>
      {children}
    </button>
  );
};

TextButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default TextButton;
