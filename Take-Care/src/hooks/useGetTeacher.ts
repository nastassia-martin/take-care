import { teachersCol } from "../services/firebase";
import { TeacherProfile } from "../types/CreateProfile.types";
import useStreamDocument from "./useStreamDocument";

const useGetTeacher = (documentId = "") => {
  return useStreamDocument<TeacherProfile>(teachersCol, documentId);
};

export default useGetTeacher;
