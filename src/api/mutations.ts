import axios from "../httpClient";

function register(values: any) {
  return axios.post("/register", values);
}

const exports = {
  register,
};

export default exports;
