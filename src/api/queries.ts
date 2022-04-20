import axios from "../httpClient";

function getAllFeedback() {
  return axios.get("/feedbacks");
}

const exports = {
  getAllFeedback,
};

export default exports;
