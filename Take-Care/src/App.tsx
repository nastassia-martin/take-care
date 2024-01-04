//import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import ParentProfilePage from "./pages/ParentProfile/ParentProfilePage";
import CreateTeacherProfile from "./components/Forms/CreateTeacherProfile";
import CreateFamilyProfile from "./components/Forms/CreateFamilyProfile";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginUserPage from "./pages/LoginUserPage";
import ChildProfilePage from "./pages/ChildProfile/ChildPage";

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
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/newFamilyProfile" element={<CreateFamilyProfile />} />
        <Route path="/newTeacherProfile" element={<CreateTeacherProfile />} />
        <Route path="/parents/:id" element={<ParentProfilePage />} />
        <Route path="/children" />
        <Route path="/children/:id" element={<ChildProfilePage />} />
        {/* <Route path="/" element={<FAQ />} /> */}
        {/* Protected Routes */}
        <Route />
      </Routes>
    </>
  );
};

export default App;
