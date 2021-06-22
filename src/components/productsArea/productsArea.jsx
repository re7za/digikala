import React, { useState, useEffect } from "react";

import { productsServices } from "../../services/products.service";
import Pagination from "../../lib/pagination";
import { ProductsGrid } from "../productsGrid";
import Loader from "../../lib/loader";

import style from "../../assets/styles/components/productsArea/style.module.scss";

export const ProductsArea = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchProducts = async () => {
    const res = await productsServices.fetchProducts({ currentPage });
    setIsLoading(false);
    setProducts(res?.products);
    setCurrentPage(res.pager.current_page);
    setTotalPage(res.pager.total_pages);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {!isLoading ? (
        <div className={style.productsGrid}>
          <ProductsGrid products={products} />
          {totalPage && (
            <Pagination
              totalPages={totalPage}
              currentPage={currentPage}
              onPageChanged={handlePageChange}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
