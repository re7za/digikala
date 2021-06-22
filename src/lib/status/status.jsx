import React from "react";
import PropTypes from "prop-types";

import style from "../../assets/styles/lib/status/style.module.scss";

const Status = (props) => {
  const { isMarketable } = props;

  return (
    <div className={style.status}>
      وضعیت :‌{" "}
      <span
        className={
          isMarketable ? style.statusAvailable : style.StatusUnavailable
        }
      >
        {isMarketable ? "آماده ارسال" : "ناموجود"}
      </span>
    </div>
  );
};

Status.propTypes = {
  isMarketable: PropTypes.bool,
};

Status.defaultProps = {
  isMarketable: false,
};

export default Status;
