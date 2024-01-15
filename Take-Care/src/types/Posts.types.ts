import { Timestamp } from "firebase/firestore";

export interface NewPostWithPhotoFile {
  title: string;
  content: string;
  photo?: FileList;
}

export interface NewPost {
  title: string;
  content: string;
  photo?: string;
}

export interface Post extends NewPost {
  _id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  authorId: string; // will be teacher id
  parents: string[];
  authorName: string;
  likes?: string[];
}

export type Posts = Post[];
