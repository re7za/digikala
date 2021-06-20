import React from "react";

import style from "../../assets/styles/lib/button/style.module.scss";

export const Button = ({ children, ...otherProps }) => {
  return (
    <button className={style.button} {...otherProps}>
      {children}
    </button>
  );
};
