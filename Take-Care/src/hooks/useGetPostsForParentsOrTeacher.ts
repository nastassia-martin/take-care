import { or, where } from "firebase/firestore";
import { teachersCol } from "../services/firebase";
import { TeacherProfile } from "../types/Profile.types";
import useStreamWithFilterConstraintCollection from "./useStreamCollectionWithFilterConstraint";

// const useGetPostsforParents = (id = "") => {
//   return useStreamCollection<TeacherProfile>(
//     teachersCol,
//     where("parents", "array-contains", id)
//     //orderBy("createdAt", "desc")
//   );
// };

// export default useGetPostsforParents;

const useGetPostsForParentOrTeacher = (id = "") => {
  return useStreamWithFilterConstraintCollection<TeacherProfile>(
    teachersCol,
    or(where("parents", "array-contains", id), where("_id", "==", id))
  );
};

// const useGetPostsForParentOrTeacher = (id = "") => {
//   const filterConstraints: QueryConstraint[] = [
//     where("parents", "array-contains", id),
//     where("_id", "==", id),
//   ];

//   const orderConstraint = orderBy("posts.createdAt", "desc");

//   return useStreamWithFilterConstraintCollection<TeacherProfile>(
//     teachersCol,
//     filterConstraints,
//     orderConstraint
//   );
// };
export default useGetPostsForParentOrTeacher;
