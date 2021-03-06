import React from "react";

import style from "../../assets/styles/lib/button/style.module.scss";

const Button = (props) => {
  const { children, disabled, ...otherProps } = props;

  return (
    <button
      disabled={disabled}
      className={`${style.button} ${disabled && style.disabled}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};
export default Button;
