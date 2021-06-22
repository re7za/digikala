import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { handleSearchInputChange } from "../../redux/actions/query.actions";

import CartsModal from "../cartsModal";
import SearchInput from "../../lib/searchInput";

import style from "../../assets/styles/components/header/style.module.scss";

const Header = ({ dispatch }) => {
  const location = useLocation();
  const renderCartsModal = !location.pathname.includes("/carts");

  const handleonChange = (newVal) => {
    dispatch(handleSearchInputChange(newVal));
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

const mapStateToProps = (state) => {
  return {
    searchQuery: state.queryReducer.searchQuery,
  };
};

export default connect(mapStateToProps)(Header);
