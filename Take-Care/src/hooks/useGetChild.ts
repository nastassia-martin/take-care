import { childrenCol } from "../services/firebase";
import { ChildProfile } from "../types/Profile.types";
import useStreamDocument from "./useStreamDocument";

const useGetChild = (documentId: string) => {
  return useStreamDocument<ChildProfile>(childrenCol, documentId);
};

export default useGetChild;
