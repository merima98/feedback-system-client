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

function deleteFeedback(feedbackId: number) {
  return axios.delete(`/feedbacks/${feedbackId}`);
}

function updateFeedback(data: any) {
  return axios.put(
    `/feedbacks/${data.id}`,
    (data = {
      userId: data.userId,
      reporterId: data.reporterId,
      content: data.content,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt,
    })
  );
}

function updateUserProfile(data: any) {
  return axios.put(
    `/users/${data.id}`,
    (data = {
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      email: data.email,
      password: data.password,
    })
  );
}

const exports = {
  register,
  login,
  addNewFeedback,
  deleteFeedback,
  updateUserProfile,
  updateFeedback,
};

export default exports;
