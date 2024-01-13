import { or, where } from "firebase/firestore";
import { TeacherProfile } from "../types/Profile.types";
import useStreamSubcollection from "./useStreamCollectionGroup";

const useGetPosts = (id = "") => {
  return useStreamSubcollection<TeacherProfile>(
    "posts",
    or(where("parents", "array-contains", id), where("_id", "==", id))
    //orderBy("posts.createdAt", "desc") // not supported
  );
};
export default useGetPosts;
