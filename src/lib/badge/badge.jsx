import React from "react";
import PropTypes from "prop-types";

import style from "../../assets/styles/lib/badge/style.module.scss";

export const Badge = ({ children }) => {
  return <span className={style.badge}>{children}</span>;
};

Badge.prototype = {
  children: PropTypes.any,
  //   color: PropTypes.oneOf(["green", "red", "blue", "orange"]),
};
