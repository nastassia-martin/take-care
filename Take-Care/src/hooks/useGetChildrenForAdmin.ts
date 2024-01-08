import { childrenCol } from "../services/firebase";
import { ChildProfile } from "../types/Profile.types";
import useStreamCollection from "./useStreamCollection";

const useGetChildrenForAdmin = () => {
  return useStreamCollection<ChildProfile>(childrenCol);
};

export default useGetChildrenForAdmin;
