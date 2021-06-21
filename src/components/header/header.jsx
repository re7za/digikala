import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import SearchInput from "../../lib/searchInput";
import style from "../../assets/styles/components/header/style.module.scss";

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchVal, setSearchVal] = useState("");

  const handleonChange = (newVal) => {
    setSearchVal(newVal);
  };

  return (
    <div className={style.header}>
      <Link to="/products-list" className={style.logoBox}>
        <img
          src="https://www.digikala.com/static/files/bc60cf05.svg"
          alt="لوگو"
        />
      </Link>
      <div className={style.centerCol}>
        <div className={style.searchBox}>
          <SearchInput
            placeholder="جستجو در دیجی‌کالا"
            handleonChange={handleonChange}
          />
        </div>
      </div>
      <Link to="/carts" className={style.cartsLink}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </Link>
    </div>
  );
};

export default Header;
