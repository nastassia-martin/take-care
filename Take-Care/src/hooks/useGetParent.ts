import { parentsCol } from "../services/firebase";
import { ParentProfile } from "../types/CreateProfile.types";
import useStreamDocument from "./useStreamDocument";

const useGetParent = (documentId = "") => {
  return useStreamDocument<ParentProfile>(parentsCol, documentId);
};

export default useGetParent;
