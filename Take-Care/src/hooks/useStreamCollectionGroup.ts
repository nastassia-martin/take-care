import {
  collection,
  CollectionReference,
  QueryConstraint,
  onSnapshot,
  query,
  DocumentReference,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamSubcollection = <T>(
  docRef: DocumentReference, // Reference to the parent document
  subcollectionName: string, // Name of the subcollection
  ...queryConstraints: QueryConstraint[]
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Construct a reference to the subcollection
    const subColRef = collection(
      docRef,
      subcollectionName
    ) as CollectionReference<T>;

    // Construct a query reference
    const queryRef = query(subColRef, ...queryConstraints);

    // Subscribe to changes in the subcollection in realtime
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      if (snapshot.empty) {
        setLoading(false);
        return;
      }

      const data: T[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        _id: doc.id,
      }));

      setData(data);
      setLoading(false);
    });

    // Return unsubscribe function as cleanup
    return unsubscribe;
  }, [docRef, subcollectionName]);

  return {
    data,
    loading,
  };
};

export default useStreamSubcollection;
