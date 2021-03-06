/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";

import style from "../../assets/styles/lib/searchInput/style.module.scss";

const TYPING_DONE_TIME = 800;

function SearchInput(props) {
  const { handleonChange, ...otherProps } = props;
  const [typingTimeout, setTypingTimeout] = useState();

  const handleChange = (e) => {
    clearTimeout(typingTimeout);

    const inputVal = e.target.value.trim();

    setTypingTimeout(
      setTimeout(() => {
        handleonChange(inputVal);
      }, TYPING_DONE_TIME)
    );
  };

  return (
    <input
      className={style.input}
      type="text"
      {...otherProps}
      onChange={handleChange}
    />
  );
}

SearchInput.propTypes = {
  handleonChange: PropTypes.func,
};

export default SearchInput;
