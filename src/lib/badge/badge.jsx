import React from "react";
import PropTypes from "prop-types";

import style from "../../assets/styles/lib/badge/style.module.scss";

const Badge = ({ children }) => {
  return <span className={style.badge}>{children}</span>;
};

Badge.propTypes = {
  children: PropTypes.any,
};

export default Badge;
