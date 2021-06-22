import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { productsServices } from "../../services/products.service";
import ProductCard from "../../lib/productCard";
import Pagination from "../../lib/pagination";
import Loader from "../../lib/loader";

import style from "../../assets/styles/components/productsArea/style.module.scss";

const ProductsArea = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(null);

  let _currentPage = currentPage;

  useEffect(() => {
    _currentPage = 1;
  }, [searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, [currentPage, searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchProducts = async () => {
    const res = await productsServices.fetchProducts({
      currentPage: _currentPage,
      searchQuery,
    });
    setIsLoading(false);
    setProducts(res?.products);
    setCurrentPage(res.pager.current_page);
    setTotalPage(res.pager.total_pages);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className={style.productsArea}>
        {!isLoading ? (
          <>
            <div className={style.grid}>
              {products?.map((product) => (
                <React.Fragment key={product.id}>
                  <ProductCard {...product} />
                </React.Fragment>
              ))}
            </div>
            {totalPage && (
              <Pagination
                totalPages={totalPage}
                currentPage={currentPage}
                onPageChanged={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className={style.loader}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchQuery: state.queryReducer.searchQuery,
  };
};

export default connect(mapStateToProps)(ProductsArea);
