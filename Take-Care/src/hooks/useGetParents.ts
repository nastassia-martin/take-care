import { where } from "firebase/firestore";
import { parentsCol } from "../services/firebase";
import { ParentProfile } from "../types/CreateProfile.types";
import useStreamCollection from "./useStreamCollection";

const useGetParents = (id = "") => {
  return useStreamCollection<ParentProfile>(
    parentsCol,
    where("children", "array-contains", id)
  );
};

export default useGetParents;
