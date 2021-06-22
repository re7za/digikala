import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import style from "../../assets/styles/lib/rating/style.module.scss";

const Rating = (props) => {
  const { rate, count } = props;

  return (
    <div>
      <span className={style.star}>
        <FontAwesomeIcon icon={faStar} />
      </span>{" "}
      <span className={style.rate}>{rate}</span>{" "}
      <span className={style.count}>({count})</span>
    </div>
  );
};

Rating.propTypes = {
  rate: PropTypes.number,
  count: PropTypes.number,
};

Rating.defaultProps = {
  rate: 0,
  count: 0,
};

export default Rating;
