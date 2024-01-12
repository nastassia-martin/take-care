import {
  CollectionReference,
  QueryCompositeFilterConstraint,
  QueryNonFilterConstraint,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

/**
 * use for more complex queries which require an "or" or "and" eg:
 * 
 * const useGetSomething = (foo: string, bar: string) => {
  return useStreamWithFilterConstraintCollection<Profile>(
    someCol,
    or(
      where("parents", "array-contains", foo),
      where("children", "array-contains", bar)
    )
  );
};
 */
const useStreamWithFilterConstraintCollection = <T>(
  colRef: CollectionReference<T>,
  queryFilterConstraints: QueryCompositeFilterConstraint, // permit "OR", "AND" constraints
  ...queryConstraints: QueryNonFilterConstraint[]
) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Get data on component mount
  useEffect(() => {
    // Construct a query reference
    const queryRef = query(colRef, queryFilterConstraints, ...queryConstraints);

    // Subscribe to changes in the collection in realtime
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      if (snapshot.empty) {
        return;
      }
      // loop over all docs

      const data: T[] = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          _id: doc.id,
        };
      });

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

// const useStreamWithFilterConstraintCollection = <T>(
//   colRef: CollectionReference<T>,
//   queryFilterConstraints: QueryConstraint[], // Array of QueryConstraint for filters
//   queryOrderConstraint?: QueryConstraint // Optional QueryConstraint for ordering
// ) => {
//   const [data, setData] = useState<T[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Construct a query reference with filter and optional order constraints
//     const queryRef = queryOrderConstraint
//       ? query(colRef, ...queryFilterConstraints, queryOrderConstraint)
//       : query(colRef, ...queryFilterConstraints);

//     // Subscribe to changes in the collection in realtime
//     const unsubscribe = onSnapshot(queryRef, (snapshot) => {
//       if (snapshot.empty) {
//         return;
//       }
//       // loop over all docs
//       const data: T[] = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         _id: doc.id,
//       }));

//       setData(data);
//       setLoading(false);
//     });

//     // Return unsubscribe function as cleanup
//     return unsubscribe;
//   }, [colRef, queryFilterConstraints, queryOrderConstraint]);

//   return {
//     data,
//     loading,
//   };
// };
export default useStreamWithFilterConstraintCollection;
