import axios from "../helpers/http-client";

const fetchProducts = () => {
  return axios
    .get("/search/")
    .then((res) => {
      if (res.status === 200) return res.data.data;
    })
    .catch((err) => console.error(err));
};

const fetchProductById = (id) => {
  return axios
    .get(`/product/${id}/`)
    .then((res) => {
      if (res.status === 200) return res.data.data;
    })
    .catch((err) => console.error(err));
};

export const productsServices = {
  fetchProducts,
  fetchProductById,
};
