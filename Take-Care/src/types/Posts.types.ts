import { Timestamp } from "firebase/firestore";

export interface NewPost {
  title: string;
  content: string;
}

export interface Post extends NewPost {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  authorId: string; // will be teacher id
}

export type Posts = Post[];
