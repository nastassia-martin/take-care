//import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import ParentProfilePage from "./pages/ParentProfile/ParentProfilePage";
import CreateTeacherProfile from "./components/Forms/CreateTeacherProfile";
import CreateFamilyProfile from "./components/Forms/CreateFamilyProfile";
import RegisterUserForm from "./components/Forms/RegisterUserForm";
import RegisterUserPage from "./pages/RegisterUserPage";

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
        <Route path="/Register" element={<RegisterUserPage />} />
        <Route path="/newFamilyProfile" element={<CreateFamilyProfile />} />
        <Route path="/newTeacherProfile" element={<CreateTeacherProfile />} />

        <Route path="/profiles" element={<ParentProfilePage />} />

        {/* <Route path="/" element={<FAQ />} /> */}
        {/* Protected Routes */}
        <Route />
      </Routes>
    </>
  );
};

export default App;
