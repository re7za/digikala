import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import style from "../../assets/styles/lib/counterButtons/style.module.scss";

const CounterButtons = (props) => {
  const { onDecrease, onIncrease, counter } = props;
  return (
    <div className={style.counterBox}>
      <button className={style.button} onClick={onIncrease}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <span className={style.counter}>{counter}</span>
      <button className={style.button} onClick={onDecrease}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  );
};

CounterButtons.propTypes = {
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
  counter: PropTypes.number,
};

CounterButtons.defaultProps = {
  counter: 0,
};

export default CounterButtons;
