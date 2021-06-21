import React, { useState, useEffect } from "react";

import { productsServices } from "../../services/products.service";
import Pagination from "../../lib/pagination";
import { ProductsGrid } from "../productsGrid";
import Loader from "../../lib/loader";

import style from "../../assets/styles/components/productsArea/style.module.scss";

export const ProductsArea = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    const res = await productsServices.fetchProducts({ currentPage });
    setProducts(res?.products);
    setCurrentPage(res.pager.current_page);
    setTotalPage(res.pager.total_pages);
  };

  return (
    <div>
      {products.length ? (
        <div className={style.productsGrid}>
          <ProductsGrid products={products} />
          {totalPage && (
            <Pagination
              totalPages={totalPage}
              currentPage={currentPage}
              onPageChanged={setCurrentPage}
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
