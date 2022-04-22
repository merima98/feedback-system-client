import axios from "../httpClient";

function getAllFeedback() {
  return axios.get("/feedbacks");
}

function getUserById(userId: number) {
  return axios.get(`/users/${userId}?_embed=feedbacks`);
}

function getAllUsers() {
  return axios.get("/users?_embed=feedbacks");
}

function getSingleFeedback(feedbackId: number) {
  return axios.get(`/feedbacks/${feedbackId}`);
}

const exports = {
  getAllFeedback,
  getUserById,
  getAllUsers,
  getSingleFeedback,
};

export default exports;
