import axios from "../helpers/http-client";

const getProducts = () => {
  return axios
    .get("/search")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};

export const productsServices = {
  getProducts,
};
