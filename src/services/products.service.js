import axios from "../helpers/http-client";

const fetchProducts = ({ currentPage = 1, searchQuery }) => {
  return axios
    .get("/search/", {
      params: { page: currentPage, q: searchQuery },
    })
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
