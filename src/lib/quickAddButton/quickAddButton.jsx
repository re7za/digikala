import React from "react";

import style from "../../assets/styles/lib/quickAddButton/style.module.scss";

export const QuickAddButton = (props) => {
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
