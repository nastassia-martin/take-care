import { parentsCol } from "../services/firebase";
import { ParentProfile } from "../types/CreateProfile.types";
import useStreamCollection from "./useStreamCollection";

const useGetParents = () => {
  return useStreamCollection<ParentProfile>(parentsCol);
};

export default useGetParents;
