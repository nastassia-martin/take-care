import { childrenCol } from "../services/firebase";
import { ChildProfile } from "../types/CreateProfile.types";
import useStreamCollection from "./useStreamCollection";

const useGetChildren = () => {
  return useStreamCollection<ChildProfile>(childrenCol);
};

export default useGetChildren;
