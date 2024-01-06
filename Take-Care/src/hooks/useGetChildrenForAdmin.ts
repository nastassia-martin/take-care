import { childrenCol } from "../services/firebase";
import { ChildProfile } from "../types/CreateProfile.types";
import useStreamCollection from "./useStreamCollection";

const useGetChildrenForAdmin = () => {
  return useStreamCollection<ChildProfile>(childrenCol);
};

export default useGetChildrenForAdmin;
