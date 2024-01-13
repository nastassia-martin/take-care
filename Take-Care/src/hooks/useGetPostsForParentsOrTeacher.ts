import { or, where } from "firebase/firestore";
import { postsCol } from "../services/firebase";
import { Post } from "../types/Posts.types";
import useStreamWithFilterConstraintCollection from "./useStreamCollectionWithFilterConstraint";

const useGetPostsForParentOrTeacher = (id = "") => {
  return useStreamWithFilterConstraintCollection<Post>(
    postsCol,
    or(where("parents", "array-contains", id), where("authorId", "==", id))
    //orderBy("posts.createdAt", "desc") // not supported
  );
};
export default useGetPostsForParentOrTeacher;
