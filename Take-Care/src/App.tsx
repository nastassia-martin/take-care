//import "./App.css";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./services/firebase";
import Navigation from "./components/NavBar/NavBar";
/**
 * @todo - set up routing for dashboard (teacher)
 *
 */

const App = () => {
  const getCollection = async () => {
    //Reference to collection
    const collRef = collection(db, "test");
    console.log(collRef);
    //snapshot
    const testColl = await getDocs(collRef);

    console.log(testColl);
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <>
      <Navigation />
      <h1>Take Care</h1>
    </>
  );
};

export default App;
