import { teachersCol } from "../services/firebase";
import { TeacherProfile } from "../types/CreateProfile.types";
import useStreamCollection from "./useStreamCollection";

const useGetTeachers = () => {
  return useStreamCollection<TeacherProfile>(teachersCol);
};

export default useGetTeachers;
