import { postsCol } from "../services/firebase";
import { Post } from "../types/Posts.types";
import useStreamDocument from "./useStreamDocument";

const useGetPostForParentOrTeacher = (documentId: string) => {
  return useStreamDocument<Post>(postsCol, documentId);
};
export default useGetPostForParentOrTeacher;
