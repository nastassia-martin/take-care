//import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import ParentProfilePage from "./pages/ParentProfile/ParentProfilePage";
//import CreateProfile from "./components/CreateProfile/CreateProfile";

/**
 * @todo - set up routing for dashboard (teacher)
 */

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        {/* Guest Routes */}
        <Route />
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/newProfile" element={<CreateProfile />} /> */}
        <Route path="/profile" element={<ParentProfilePage />} />

        {/* <Route path="/" element={<FAQ />} /> */}
        {/* Protected Routes */}
        <Route />
      </Routes>
    </>
  );
};

export default App;
