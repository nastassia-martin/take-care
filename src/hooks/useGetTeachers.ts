import { teachersCol } from "../services/firebase";
import { TeacherProfile } from "../types/Profile.types";
import useStreamCollection from "./useStreamCollection";

const useGetTeachers = () => {
  return useStreamCollection<TeacherProfile>(teachersCol);
};

export default useGetTeachers;
