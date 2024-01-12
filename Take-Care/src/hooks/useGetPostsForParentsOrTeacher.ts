import { or, where } from "firebase/firestore";
import { teachersCol } from "../services/firebase";
import { TeacherProfile } from "../types/Profile.types";
import useStreamWithFilterConstraintCollection from "./useStreamCollectionWithFilterConstraint";

const useGetPostsForParentOrTeacher = (id = "") => {
  return useStreamWithFilterConstraintCollection<TeacherProfile>(
    teachersCol,
    or(where("parents", "array-contains", id), where("_id", "==", id))
    //orderBy("posts.createdAt", "desc") // not supported
  );
};
export default useGetPostsForParentOrTeacher;
