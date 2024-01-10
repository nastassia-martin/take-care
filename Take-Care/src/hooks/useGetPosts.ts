import { where } from "firebase/firestore";
import { postsCol } from "../services/firebase";
import { Post } from "../types/Posts.types";
import useStreamCollection from "./useStreamCollection";

const useGetPosts = (id = "") => {
  return useStreamCollection<Post>(postsCol, where("authorId", "==", id));
};

export default useGetPosts;
