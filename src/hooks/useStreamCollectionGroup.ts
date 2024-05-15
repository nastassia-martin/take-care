import {
  onSnapshot,
  query,
  collectionGroup,
  QueryCompositeFilterConstraint,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";

const useStreamSubcollection = <T>(
  colRef: string,
  queryFilterConstraints: QueryCompositeFilterConstraint // permit "OR", "AND" constraints
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Construct a query reference
    const queryRef = query(collectionGroup(db, colRef), queryFilterConstraints);

    // Subscribe to changes in the subcollection in realtime
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      if (snapshot.empty) {
        setLoading(false);
        return;
      }

      const data = snapshot.docs.map((doc) => ({
        ...(doc.data() as T),
        _id: doc.id,
      }));

      setData(data);
      setLoading(false);
    });

    // Return unsubscribe function as cleanup
    return unsubscribe;
  }, [colRef]);

  return {
    data,
    loading,
  };
};

export default useStreamSubcollection;
