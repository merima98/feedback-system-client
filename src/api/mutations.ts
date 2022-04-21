import { FieldValues } from "react-hook-form";
import axios from "../httpClient";

function register(values: FieldValues) {
  return axios.post("/register", values);
}

function login(values: FieldValues) {
  return axios.post("/login", values);
}

function addNewFeedback(newFeedbackData: {
  userId: number;
  reporterId: number;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}) {
  return axios.post("/feedbacks", newFeedbackData);
}

const exports = {
  register,
  login,
  addNewFeedback,
};

export default exports;
