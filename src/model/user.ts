import { Feedback } from "./feedback";

export type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  id: number;
  feedbacks: Feedback[];
};
