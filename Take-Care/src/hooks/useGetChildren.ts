import { where } from "firebase/firestore";
import { childrenCol } from "../services/firebase";
import { ChildProfile } from "../types/CreateProfile.types";
import useStreamCollection from "./useStreamCollection";

const useGetChildren = (id = "") => {
  return useStreamCollection<ChildProfile>(
    childrenCol,
    where("parents", "array-contains", id)
  );
};

export default useGetChildren;
