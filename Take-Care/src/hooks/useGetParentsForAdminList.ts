import { parentsCol } from "../services/firebase";
import { ParentProfile } from "../types/Profile.types";
import useStreamCollection from "./useStreamCollection";

const useGetParentsForAdminList = () => {
  return useStreamCollection<ParentProfile>(parentsCol);
};

export default useGetParentsForAdminList;
