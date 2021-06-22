import React, { useState, useEffect } from "react";

import { productsServices } from "../../services/products.service";
import ProductCard from "../../lib/productCard";
import Pagination from "../../lib/pagination";
import Loader from "../../lib/loader";

import style from "../../assets/styles/components/productsArea/style.module.scss";

const ProductsArea = () => {
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
      <div className={style.productsGrid}>
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

export default ProductsArea;
