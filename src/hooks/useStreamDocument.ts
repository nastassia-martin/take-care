import { CollectionReference, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamDocument = <T>(
  colRef: CollectionReference<T>,
  documentId: string
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get data on component mount
  /*
  Must return early to handle the dependency relations between collection & sun collections in parent and child
  */
  useEffect(() => {
    if (!documentId) {
      setLoading(false);
      setData(null);
      return;
    }
    // get reference to document in collection
    const docRef = doc(colRef, documentId);
    //const depDocRef = doc(depRef, depDocumentId);

    // Subscribe to changes in the document
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (!snapshot.exists()) {
        setData(null);
        setError(true);
        setLoading(false);
        return;
      }

      const data: T = {
        ...snapshot.data(),
        _id: snapshot.id,
      };
      setData(data);
      setLoading(false);
    });

    // Return unsubscribe function as cleanup
    return unsubscribe;
  }, [colRef, documentId]);
  return {
    data,
    error,
    loading,
  };
};
export default useStreamDocument;
