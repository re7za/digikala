import React from "react";
import { useParams } from "react-router-dom";

import { products } from "../../services/mock";
import style from "../../assets/styles/pages/product/style.module.scss";

export const Product = () => {
  const { id } = useParams();
  const productId = Number(id);

  let product;
  for (let item of products) {
    if (item.id !== productId) continue;

    product = item;
    break;
  }

  return (
    <div>
      {product ? (
        <div className={style.product}>jsd</div>
      ) : (
        <div>404 Not Found</div>
      )}
    </div>
  );
};
