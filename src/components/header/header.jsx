import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import CartsModal from "../cartsModal";
import SearchInput from "../../lib/searchInput";
import style from "../../assets/styles/components/header/style.module.scss";

const Header = () => {
  const location = useLocation();
  const renderCartsModal = !location.pathname.includes("/carts");

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
      {renderCartsModal && (
        <div>
          <CartsModal />
        </div>
      )}
    </div>
  );
};

export default Header;
