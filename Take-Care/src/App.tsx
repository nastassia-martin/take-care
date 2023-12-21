//import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./services/firebase";
import Navigation from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import CreateProfile from "./components/CreateProfile/CreateProfile";
import { ChildProfile } from "./types/CreateProfile.types";

/**
 * @todo - set up routing for dashboard (teacher)
 */

const App = () => {
  const [todos, setData] = useState<ChildProfile[] | null>();

  const getCollection = async () => {
    //Reference to collection
    const collRef = collection(db, "children");

    //snapshot
    const testColl = await getDocs(collRef);

    const data = testColl.docs.map((doc) => {
      return {
        _id: doc.id,
        ...doc.data(),
      } as unknown as ChildProfile;
    });
    setData(data);
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        {/* Guest Routes */}
        <Route />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<CreateProfile />} />
        {/* <Route path="/" element={<FAQ />} /> */}
        {/* Protected Routes */}
        <Route />
      </Routes>
    </>
  );
};

export default App;
