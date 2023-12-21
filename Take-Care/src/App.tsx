//import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./services/firebase";
import Navigation from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import CreateProfile from "./components/CreateProfile/CreateProfile";
/**
 * @todo - set up routing for dashboard (teacher)
 *
 */

const App = () => {
  const getCollection = async () => {
    //Reference to collection
    const collRef = collection(db, "test");

    //snapshot
    const testColl = await getDocs(collRef);

    console.log(testColl.docs);
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
