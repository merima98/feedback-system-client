import { User } from "./user";

export type Feedback = {
  id: number;
  userId: number;
  reporterId: number;
  updatedAt: string;
  createdAt: string;
  content: string;
  user: User;
};
